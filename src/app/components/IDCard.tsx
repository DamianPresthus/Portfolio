import {
  Environment,
  Lightformer,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import { Canvas, type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  RoundCuboidCollider,
  type RapierRigidBody,
  useRapier,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  CanvasTexture,
  CatmullRomCurve3,
  ClampToEdgeWrapping,
  Color,
  type Group,
  LinearFilter,
  LinearMipmapLinearFilter,
  MathUtils,
  Plane,
  Quaternion,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
} from "three";
import defaultPortraitImage from "../../assets/optimized/damian-portrait-1200.webp";
import defaultFrontImage from "../../assets/id-card-front.webp";

export interface IDCardProps {
  frontImage?: string;
  stringColor?: string;
  clipColor?: string;
  gravity?: [number, number, number];
  /** Disable card gestures while preserving the live physics simulation. */
  interactive?: boolean;
  /** Horizontal lanyard anchor position as a factor of the scene width. */
  anchorXFactor?: number;
  className?: string;
}

const CARD_HEIGHT = 3.05;
const CARD_WIDTH = CARD_HEIGHT * (355 / 530);
const CARD_DEPTH = 0.22;
const CARD_RADIUS = 0.16;
const CARD_ATTACH = new Vector3(0.08, CARD_HEIGHT / 2 + 0.24, 0);
const ENTRY_ROTATION_Z = Math.PI * 0.84;
const Z_AXIS = new Vector3(0, 0, 1);
const ROPE_JOINT_LENGTH = 0.34;
const ROPE_BODY_COUNT = 6;
const ROPE_ANCHOR_X_FACTOR = -0.22;
const ROPE_ANCHOR_Y_OFFSET = 0.6;
const DRAG_START_DISTANCE = 7;
const CARD_EMISSIVE_INTENSITY = 0.3;
// Keep the artwork's background unchanged while giving the portrait enough
// lift to remain readable under the card's clearcoat and environment lights.
const PORTRAIT_EMISSIVE_RATIO = 0.88;

type TextureImage = CanvasImageSource & {
  width: number;
  height: number;
};

type BodyRef = RefObject<RapierRigidBody>;

function RopeConstraint({ bodyA, bodyB }: { bodyA: BodyRef; bodyB: BodyRef }) {
  useRopeJoint(bodyA, bodyB, [
    [0, 0, 0],
    [0, 0, 0],
    ROPE_JOINT_LENGTH,
  ]);
  return null;
}

function CardConstraint({ rope, card }: { rope: BodyRef; card: BodyRef }) {
  useSphericalJoint(rope, card, [
    [0, 0, 0],
    [CARD_ATTACH.x, CARD_ATTACH.y, CARD_ATTACH.z],
  ]);
  return null;
}

function makeRoundedFaceGeometry() {
  const halfWidth = CARD_WIDTH / 2;
  const halfHeight = CARD_HEIGHT / 2;
  const shape = new Shape();

  shape.moveTo(-halfWidth + CARD_RADIUS, -halfHeight);
  shape.lineTo(halfWidth - CARD_RADIUS, -halfHeight);
  shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + CARD_RADIUS);
  shape.lineTo(halfWidth, halfHeight - CARD_RADIUS);
  shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - CARD_RADIUS, halfHeight);
  shape.lineTo(-halfWidth + CARD_RADIUS, halfHeight);
  shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - CARD_RADIUS);
  shape.lineTo(-halfWidth, -halfHeight + CARD_RADIUS);
  shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + CARD_RADIUS, -halfHeight);

  const geometry = new ShapeGeometry(shape, 12);
  const positions = geometry.attributes.position;
  const uvs = geometry.attributes.uv;

  for (let index = 0; index < positions.count; index += 1) {
    uvs.setXY(
      index,
      (positions.getX(index) + halfWidth) / CARD_WIDTH,
      (positions.getY(index) + halfHeight) / CARD_HEIGHT,
    );
  }

  uvs.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

interface BadgeCardProps {
  bodyRef: BodyRef;
  frontImage: string;
  clipColor: string;
  startPosition: [number, number, number];
  interactive: boolean;
}

function BadgeCard({
  bodyRef,
  frontImage,
  clipColor,
  startPosition,
  interactive,
}: BadgeCardProps) {
  const texture = useTexture(frontImage);
  const portraitTexture = useTexture(defaultPortraitImage);
  const emissiveMap = useMemo(() => {
    if (
      frontImage !== defaultFrontImage ||
      typeof document === "undefined"
    ) {
      return texture;
    }

    const front = texture.image as TextureImage | undefined;
    const portrait = portraitTexture.image as TextureImage | undefined;
    if (!front?.width || !front.height || !portrait?.width || !portrait.height) {
      return texture;
    }

    const canvas = document.createElement("canvas");
    canvas.width = front.width;
    canvas.height = front.height;
    const context = canvas.getContext("2d");
    if (!context) return texture;

    // Begin with the original card map so the non-portrait artwork keeps the
    // exact emissive response it had before the portrait-specific adjustment.
    context.drawImage(front, 0, 0, canvas.width, canvas.height);

    const silhouette = document.createElement("canvas");
    silhouette.width = canvas.width;
    silhouette.height = canvas.height;
    const silhouetteContext = silhouette.getContext("2d");
    if (!silhouetteContext) return texture;

    // These ratios mirror .portrait in design/id-card-front-source.html.
    const portraitHeight = canvas.height * (1300 / 1590);
    const portraitWidth = portraitHeight * (portrait.width / portrait.height);
    const portraitX = canvas.width * 0.5 - portraitWidth * 0.52;
    const portraitY = canvas.height - canvas.height * (120 / 1590) - portraitHeight;

    silhouetteContext.drawImage(
      portrait,
      portraitX,
      portraitY,
      portraitWidth,
      portraitHeight,
    );
    silhouetteContext.globalCompositeOperation = "source-in";
    silhouetteContext.fillStyle = "#000000";
    silhouetteContext.fillRect(0, 0, canvas.width, canvas.height);

    context.globalAlpha = 1 - PORTRAIT_EMISSIVE_RATIO;
    context.drawImage(silhouette, 0, 0);
    context.globalAlpha = 1;

    const selectiveMap = new CanvasTexture(canvas);
    selectiveMap.colorSpace = SRGBColorSpace;
    selectiveMap.flipY = texture.flipY;
    return selectiveMap;
  }, [frontImage, portraitTexture, texture]);
  const faceGeometry = useMemo(makeRoundedFaceGeometry, []);
  const { rapier } = useRapier();
  const gl = useThree((state) => state.gl);
  const viewport = useThree((state) => state.viewport);
  const plane = useMemo(() => new Plane(new Vector3(0, 0, 1)), []);
  const planePoint = useMemo(() => new Vector3(), []);
  const hitPoint = useMemo(() => new Vector3(), []);
  const dragOffset = useRef(new Vector3());
  const velocity = useRef(new Vector3());
  const lastPosition = useRef(new Vector3());
  const lastMoveAt = useRef(0);
  const visualGroup = useRef<Group>(null);
  const pointerStart = useRef(new Vector2());
  const pressTilt = useRef(new Vector2());
  const pressed = useRef(false);
  const tapTiltUntil = useRef(0);
  const activePointer = useRef<number | null>(null);
  const captureTarget = useRef<Element | null>(null);
  const dragging = useRef(false);
  const [bodyType, setBodyType] = useState<"dynamic" | "kinematicPosition">(
    "dynamic",
  );

  useEffect(() => {
    for (const cardTexture of [texture, emissiveMap]) {
      cardTexture.colorSpace = SRGBColorSpace;
      cardTexture.wrapS = ClampToEdgeWrapping;
      cardTexture.wrapT = ClampToEdgeWrapping;
      cardTexture.repeat.set(1, 1);
      cardTexture.offset.set(0, 0);
      cardTexture.magFilter = LinearFilter;
      cardTexture.minFilter = LinearMipmapLinearFilter;
      cardTexture.generateMipmaps = true;
      cardTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
      cardTexture.needsUpdate = true;
    }
  }, [emissiveMap, gl, texture]);

  useEffect(
    () => () => {
      faceGeometry.dispose();
      if (emissiveMap !== texture) emissiveMap.dispose();
      if (activePointer.current !== null) document.body.style.cursor = "";
    },
    [emissiveMap, faceGeometry, texture],
  );

  useFrame((_, delta) => {
    const group = visualGroup.current;
    if (!group) return;

    let targetX = 0;
    let targetY = 0;
    let response = 5.5;

    if (dragging.current) {
      targetX = MathUtils.clamp(-velocity.current.y * 0.045, -0.24, 0.24);
      targetY = MathUtils.clamp(velocity.current.x * 0.055, -0.34, 0.34);
      response = 11;
    } else if (pressed.current || performance.now() < tapTiltUntil.current) {
      targetX = pressTilt.current.x;
      targetY = pressTilt.current.y;
      response = 12;
    } else {
      const body = bodyRef.current;
      if (body) {
        const linearVelocity = body.linvel();
        // Let motion reveal the card's thickness, then spring the face back
        // toward the camera as gravity and damping bring it to rest.
        targetX = MathUtils.clamp(-linearVelocity.y * 0.03, -0.22, 0.22);
        targetY = MathUtils.clamp(linearVelocity.x * 0.045, -0.28, 0.28);
      }
    }

    group.rotation.x = MathUtils.damp(group.rotation.x, targetX, response, delta);
    group.rotation.y = MathUtils.damp(group.rotation.y, targetY, response, delta);
  });

  const updatePressTilt = (event: ThreeEvent<PointerEvent>) => {
    const uvX = event.uv?.x ?? 0.5;
    const uvY = event.uv?.y ?? 0.5;
    pressTilt.current.set(
      MathUtils.clamp((uvY - 0.5) * 0.58 - 0.18, -0.36, 0.36),
      MathUtils.clamp((uvX - 0.5) * 0.72 + 0.28, -0.46, 0.46),
    );
  };

  const beginPointer = (event: ThreeEvent<PointerEvent>) => {
    const body = bodyRef.current;
    if (!body) return;

    event.stopPropagation();
    activePointer.current = event.pointerId;
    pressed.current = true;
    tapTiltUntil.current = 0;
    pointerStart.current.set(event.clientX, event.clientY);
    updatePressTilt(event);
    captureTarget.current = event.target as Element;
    captureTarget.current.setPointerCapture?.(event.pointerId);

    const position = body.translation();
    plane.setFromNormalAndCoplanarPoint(
      plane.normal,
      planePoint.set(position.x, position.y, position.z),
    );
    dragOffset.current.set(
      event.point.x - position.x,
      event.point.y - position.y,
      event.point.z - position.z,
    );
    lastPosition.current.set(position.x, position.y, position.z);
    velocity.current.set(0, 0, 0);
    lastMoveAt.current = event.timeStamp;
    document.body.style.cursor = "grabbing";
  };

  const moveDrag = (event: ThreeEvent<PointerEvent>) => {
    const body = bodyRef.current;
    if (!body || activePointer.current !== event.pointerId) return;

    event.stopPropagation();
    updatePressTilt(event);

    if (!dragging.current) {
      const pointerDistance = Math.hypot(
        event.clientX - pointerStart.current.x,
        event.clientY - pointerStart.current.y,
      );
      if (pointerDistance < DRAG_START_DISTANCE) return;

      dragging.current = true;
      body.wakeUp();
      setBodyType("kinematicPosition");
      body.setBodyType(rapier.RigidBodyType.KinematicPositionBased, true);
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      body.setAngvel({ x: 0, y: 0, z: 0 }, true);
      lastPosition.current.copy(body.translation());
      lastMoveAt.current = event.timeStamp;
    }

    if (!event.ray.intersectPlane(plane, hitPoint)) return;

    const next = hitPoint.clone().sub(dragOffset.current);
    const sideInset = CARD_WIDTH / 2 + 0.08;
    const floorInset = CARD_HEIGHT / 2 + 0.08;
    next.x = MathUtils.clamp(
      next.x,
      -viewport.width / 2 + sideInset,
      viewport.width / 2 - sideInset,
    );
    next.y = Math.max(next.y, -viewport.height / 2 + floorInset);

    const elapsed = Math.max(
      (event.timeStamp - lastMoveAt.current) / 1000,
      1 / 120,
    );
    velocity.current.copy(next).sub(lastPosition.current).divideScalar(elapsed);
    if (velocity.current.lengthSq() > 30.25) velocity.current.setLength(5.5);

    body.setNextKinematicTranslation({ x: next.x, y: next.y, z: next.z });
    lastPosition.current.copy(next);
    lastMoveAt.current = event.timeStamp;
  };

  const endPointer = (event: ThreeEvent<PointerEvent>) => {
    const body = bodyRef.current;
    if (!body || activePointer.current !== event.pointerId) return;

    event.stopPropagation();
    const wasDragging = dragging.current;
    const pointerId = activePointer.current;
    activePointer.current = null;
    pressed.current = false;
    dragging.current = false;
    captureTarget.current?.releasePointerCapture?.(pointerId);
    captureTarget.current = null;

    if (wasDragging) {
      setBodyType("dynamic");
      body.setBodyType(rapier.RigidBodyType.Dynamic, true);
      body.setLinvel(
        { x: velocity.current.x, y: velocity.current.y, z: velocity.current.z },
        true,
      );
      body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    } else {
      // Hold the tilt for a beat so a quick tap still produces a readable
      // clearcoat sweep without disturbing the physics body or lanyard.
      tapTiltUntil.current = performance.now() + 180;
    }

    document.body.style.cursor = "grab";
  };

  const interactionHandlers = interactive
    ? {
        onPointerDown: beginPointer,
        onPointerMove: moveDrag,
        onPointerUp: endPointer,
        onPointerCancel: endPointer,
        onPointerOver: () => {
          if (!dragging.current) document.body.style.cursor = "grab";
        },
        onPointerOut: () => {
          if (activePointer.current === null) document.body.style.cursor = "";
        },
      }
    : {};

  return (
    <RigidBody
      ref={bodyRef}
      type={bodyType}
      position={startPosition}
      rotation={[0, 0, ENTRY_ROTATION_Z]}
      angularVelocity={[0, 0, -1.15]}
      enabledTranslations={[true, true, false]}
      enabledRotations={[false, false, true]}
      colliders={false}
      linearDamping={0.9}
      angularDamping={1.65}
      additionalSolverIterations={8}
      canSleep
      ccd
    >
      <RoundCuboidCollider
        args={[CARD_WIDTH / 2, CARD_HEIGHT / 2, CARD_DEPTH / 2, 0.075]}
        mass={0.72}
      />

      <group
        ref={visualGroup}
        position={[CARD_ATTACH.x, CARD_ATTACH.y, 0]}
        {...interactionHandlers}
      >
        <group position={[-CARD_ATTACH.x, -CARD_ATTACH.y, 0]}>
          <RoundedBox
            args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]}
            radius={0.075}
            smoothness={5}
          >
            <meshPhysicalMaterial
              color="#171d27"
              clearcoat={1}
              clearcoatRoughness={0.15}
              roughness={0.34}
              metalness={0.12}
            />
          </RoundedBox>

          <mesh geometry={faceGeometry} position={[0, 0, CARD_DEPTH / 2 + 0.012]}>
            <meshPhysicalMaterial
              map={texture}
              color="#ffffff"
              emissive="#ffffff"
              emissiveMap={emissiveMap}
              emissiveIntensity={CARD_EMISSIVE_INTENSITY}
              clearcoat={1}
              clearcoatRoughness={0.15}
              roughness={0.28}
              metalness={0.08}
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </mesh>

          <group
            position={[
              CARD_ATTACH.x,
              CARD_HEIGHT / 2 + 0.05,
              CARD_DEPTH / 2 + 0.04,
            ]}
          >
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.26, 0.34, 0.12]} />
              <meshStandardMaterial
                color={clipColor}
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, 0.32, 0]}>
              <torusGeometry args={[0.13, 0.045, 12, 28]} />
              <meshStandardMaterial
                color={clipColor}
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

interface LanyardLineProps {
  ropeBodies: BodyRef[];
  cardBody: BodyRef;
  color: string;
}

function HeroFloor({ bodyRef, initialY }: { bodyRef: BodyRef; initialY: number }) {
  return (
    <RigidBody ref={bodyRef} type="fixed" position={[0, initialY, 0]} colliders={false}>
      <CuboidCollider
        // The floor is deliberately much wider than the canvas so resizing it
        // never recreates a collider underneath the moving card.
        args={[50, 0.12, 2]}
        friction={0.85}
        restitution={0.05}
      />
    </RigidBody>
  );
}

interface ResizeStabilizerProps {
  anchor: BodyRef;
  ropeBodies: BodyRef[];
  card: BodyRef;
  floor: BodyRef;
  anchorXFactor: number;
}

function LanyardResizeStabilizer({
  anchor,
  ropeBodies,
  card,
  floor,
  anchorXFactor,
}: ResizeStabilizerProps) {
  const viewport = useThree((state) => state.viewport);
  const previousViewport = useRef<{ width: number; height: number } | null>(null);

  useFrame(() => {
    const anchorBody = anchor.current;
    const cardBody = card.current;
    const floorBody = floor.current;

    if (
      !anchorBody ||
      !cardBody ||
      !floorBody ||
      ropeBodies.some((body) => !body.current)
    ) {
      return;
    }

    const nextViewport = { width: viewport.width, height: viewport.height };
    const previous = previousViewport.current;
    if (!previous) {
      previousViewport.current = nextViewport;
      return;
    }

    if (
      Math.abs(previous.width - nextViewport.width) < 0.001 &&
      Math.abs(previous.height - nextViewport.height) < 0.001
    ) {
      return;
    }

    previousViewport.current = nextViewport;

    const nextAnchor = {
      x: viewport.width * anchorXFactor,
      y: viewport.height / 2 + ROPE_ANCHOR_Y_OFFSET,
      z: 0,
    };
    const currentAnchor = anchorBody.translation();
    const delta = {
      x: nextAnchor.x - currentAnchor.x,
      y: nextAnchor.y - currentAnchor.y,
      z: nextAnchor.z - currentAnchor.z,
    };

    // Move every live body by the same delta. That keeps the exact rope and
    // card shape that the user sees instead of resetting the joint chain to
    // its spawn pose whenever browser zoom changes the canvas viewport.
    for (const bodyRef of [...ropeBodies.slice(1), card]) {
      const body = bodyRef.current;
      if (!body) continue;

      const position = body.translation();
      body.setTranslation(
        {
          x: position.x + delta.x,
          y: position.y + delta.y,
          z: position.z + delta.z,
        },
        false,
      );
    }
    anchorBody.setTranslation(nextAnchor, false);

    // Updating the floor through the fixed body avoids moving a collider into
    // the card during a smaller viewport. Existing velocity is intentionally
    // left untouched, so normal swinging and release behaviour stay the same.
    const cardPosition = cardBody.translation();
    const desiredFloorY = -viewport.height / 2 - 0.12;
    const collisionSafeFloorY = Math.min(
      desiredFloorY,
      cardPosition.y - CARD_HEIGHT / 2 - 0.2,
    );
    floorBody.setTranslation({ x: 0, y: collisionSafeFloorY, z: 0 }, false);
  });

  return null;
}

function LanyardLine({ ropeBodies, cardBody, color }: LanyardLineProps) {
  const size = useThree((state) => state.size);
  const geometry = useMemo(() => new MeshLineGeometry(), []);
  const material = useMemo(() => {
    const nextMaterial = new MeshLineMaterial({
      color: new Color(color),
      lineWidth: 0.09,
      resolution: new Vector2(1, 1),
      sizeAttenuation: 1,
    });
    nextMaterial.depthWrite = false;
    return nextMaterial;
  }, [color]);
  const curve = useMemo(() => new CatmullRomCurve3(), []);
  const cardRotation = useMemo(() => new Quaternion(), []);

  useEffect(() => {
    material.resolution.set(size.width, size.height);
  }, [material, size.height, size.width]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame(() => {
    const card = cardBody.current;
    if (!card || ropeBodies.some((body) => !body.current)) return;

    const points = ropeBodies.map((body) => {
      const translation = body.current!.translation();
      return new Vector3(translation.x, translation.y, translation.z);
    });
    const cardPosition = card.translation();
    const rotation = card.rotation();
    cardRotation.set(rotation.x, rotation.y, rotation.z, rotation.w);
    points.push(
      CARD_ATTACH.clone()
        .applyQuaternion(cardRotation)
        .add(new Vector3(cardPosition.x, cardPosition.y, cardPosition.z)),
    );

    curve.points = points;
    geometry.setPoints(curve.getPoints(34));
  });

  return (
    <mesh
      geometry={geometry}
      material={material}
      frustumCulled={false}
      renderOrder={2}
    />
  );
}

function LanyardScene({
  frontImage,
  stringColor,
  clipColor,
  interactive,
  anchorXFactor,
}: Required<
  Pick<
    IDCardProps,
    "frontImage" | "stringColor" | "clipColor" | "interactive" | "anchorXFactor"
  >
>) {
  const viewport = useThree((state) => state.viewport);
  const anchor = useRef<RapierRigidBody>(null);
  const segmentOne = useRef<RapierRigidBody>(null);
  const segmentTwo = useRef<RapierRigidBody>(null);
  const segmentThree = useRef<RapierRigidBody>(null);
  const segmentFour = useRef<RapierRigidBody>(null);
  const segmentFive = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);
  const floor = useRef<RapierRigidBody>(null);
  const ropeBodies = useMemo(
    () => [anchor, segmentOne, segmentTwo, segmentThree, segmentFour, segmentFive],
    [],
  );
  const [ropePositions] = useState<[number, number, number][]>(() => {
    const anchorX = viewport.width * anchorXFactor;
    const anchorY = viewport.height / 2 + ROPE_ANCHOR_Y_OFFSET;

    return Array.from({ length: ROPE_BODY_COUNT }, (_, index) => [
      anchorX,
      anchorY - index * 0.05,
      0,
    ]);
  });
  const [initialFloorY] = useState(() => -viewport.height / 2 - 0.12);
  const cardStart = useMemo<[number, number, number]>(() => {
    const lastRopePosition = ropePositions[ropePositions.length - 1];
    const rotatedCardAttach = CARD_ATTACH.clone().applyAxisAngle(
      Z_AXIS,
      ENTRY_ROTATION_Z,
    );

    return [
      lastRopePosition[0] - rotatedCardAttach.x,
      lastRopePosition[1] - rotatedCardAttach.y,
      0,
    ];
  }, [ropePositions]);

  return (
    <>
      <HeroFloor bodyRef={floor} initialY={initialFloorY} />
      {ropeBodies.map((body, index) => (
        <RigidBody
          key={index}
          ref={body}
          type={index === 0 ? "fixed" : "dynamic"}
          position={ropePositions[index]}
          colliders={false}
          linearDamping={1.15}
          angularDamping={1.2}
          additionalSolverIterations={8}
          canSleep
        >
          <BallCollider args={[0.065]} mass={0.1} />
        </RigidBody>
      ))}

      {ropeBodies.slice(0, -1).map((body, index) => (
        <RopeConstraint key={index} bodyA={body} bodyB={ropeBodies[index + 1]} />
      ))}
      <BadgeCard
        bodyRef={card}
        frontImage={frontImage}
        clipColor={clipColor}
        startPosition={cardStart}
        interactive={interactive}
      />
      <CardConstraint rope={segmentFive} card={card} />
      <LanyardResizeStabilizer
        anchor={anchor}
        ropeBodies={ropeBodies}
        card={card}
        floor={floor}
        anchorXFactor={anchorXFactor}
      />
      <LanyardLine ropeBodies={ropeBodies} cardBody={card} color={stringColor} />
    </>
  );
}

export function IDCard({
  frontImage = defaultFrontImage,
  stringColor = "rgb(33, 33, 33)",
  clipColor = "rgb(71, 71, 71)",
  gravity = [0, -10.5, 0],
  interactive = true,
  anchorXFactor = ROPE_ANCHOR_X_FACTOR,
  className,
}: IDCardProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        touchAction: interactive ? "none" : "auto",
        pointerEvents: interactive ? "auto" : "none",
      }}
      role="img"
      aria-label={
        interactive
          ? "Interactive ID card for Damian Aaby Præsthus. Drag the card to swing it."
          : "Animated ID card for Damian Aaby Præsthus."
      }
    >
      <Canvas
        camera={{ position: [0, 0, 13], fov: 25 }}
        dpr={[1.5, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        fallback={
          <img
            src={frontImage}
            alt="Damian Aaby Præsthus ID card"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        }
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[-3, 4, 6]} intensity={0.8} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={1 / 60} colliders={false}>
            <LanyardScene
              frontImage={frontImage}
              stringColor={stringColor}
              clipColor={clipColor}
              interactive={interactive}
              anchorXFactor={anchorXFactor}
            />
          </Physics>
          <Environment resolution={64}>
            <Lightformer
              form="rect"
              intensity={2.2}
              color="#fff4e8"
              position={[-3, 2, 5]}
              rotation={[0, 0.35, 0]}
              scale={[5, 0.45, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1.7}
              color="#b9d9ff"
              position={[4, 0, 4]}
              rotation={[0, -0.55, 0.2]}
              scale={[3.5, 0.3, 1]}
            />
            <Lightformer
              form="rect"
              intensity={1.4}
              color="#ffd1aa"
              position={[0, -4, 3]}
              rotation={[0, 0, -0.25]}
              scale={[4, 0.35, 1]}
            />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default IDCard;
