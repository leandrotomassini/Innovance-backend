--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Debian 14.3-1.pgdg110+1)
-- Dumped by pg_dump version 14.3 (Debian 14.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: application_subscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.application_subscription (
    "idApplicationSubscription" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    subscription text NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "applicationWebIdApplicationWeb" uuid,
    "subscriptionPlanIsSubscription" uuid
);


ALTER TABLE public.application_subscription OWNER TO postgres;

--
-- Name: application_web; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.application_web (
    "idApplicationWeb" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    slug text NOT NULL,
    status boolean DEFAULT true NOT NULL
);


ALTER TABLE public.application_web OWNER TO postgres;

--
-- Name: ask_video; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ask_video (
    "idAskVideo" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "userId" uuid,
    "videoCourseIdVideo" uuid
);


ALTER TABLE public.ask_video OWNER TO postgres;

--
-- Name: certificate_course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificate_course (
    "idCertificatedCourse" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "courseIdCourse" uuid,
    "userId" uuid
);


ALTER TABLE public.certificate_course OWNER TO postgres;

--
-- Name: certificate_school; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificate_school (
    "idCertificateSchool" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "userId" uuid
);


ALTER TABLE public.certificate_school OWNER TO postgres;

--
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    "idCourse" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    slug text NOT NULL,
    logo text NOT NULL,
    "frontPage" text NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid
);


ALTER TABLE public.course OWNER TO postgres;

--
-- Name: course_instructor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_instructor (
    "idCourseInstructor" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "courseIdCourse" uuid,
    "instructorIdInstructor" uuid
);


ALTER TABLE public.course_instructor OWNER TO postgres;

--
-- Name: course_school; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_school (
    "idCourseSchool" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "schoolIdSchool" uuid,
    "courseIdCourse" uuid
);


ALTER TABLE public.course_school OWNER TO postgres;

--
-- Name: course_taken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_taken (
    "idCourseTaken" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "courseIdCourse" uuid,
    "userId" uuid
);


ALTER TABLE public.course_taken OWNER TO postgres;

--
-- Name: instructor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instructor (
    "idInstructor" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "imgUrl" text NOT NULL,
    title text NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "userId" uuid
);


ALTER TABLE public.instructor OWNER TO postgres;

--
-- Name: learning_route; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_route (
    "idLearningRoute" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    "isOfficialRoute" boolean DEFAULT false NOT NULL,
    "isPrivate" boolean DEFAULT true NOT NULL,
    status boolean DEFAULT true NOT NULL
);


ALTER TABLE public.learning_route OWNER TO postgres;

--
-- Name: learning_route_course_learning_route; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_route_course_learning_route (
    "idLearningRouteCourseLearningRoute" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "courseIdCourse" uuid,
    "learningRouteIdLearningRoute" uuid
);


ALTER TABLE public.learning_route_course_learning_route OWNER TO postgres;

--
-- Name: notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification (
    "idNotification" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "dateTime" timestamp without time zone DEFAULT now() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    url text NOT NULL,
    viewed boolean DEFAULT false NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "userId" uuid
);


ALTER TABLE public.notification OWNER TO postgres;

--
-- Name: resource_video_course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resource_video_course (
    "idResourceVideoCourse" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    url text NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "videoCourseIdVideo" uuid
);


ALTER TABLE public.resource_video_course OWNER TO postgres;

--
-- Name: school; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.school (
    "idSchool" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    slug text NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "userId" uuid,
    "certificateSchoolIdCertificateSchool" uuid
);


ALTER TABLE public.school OWNER TO postgres;

--
-- Name: school_taken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.school_taken (
    "idSchoolTaken" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "schoolIdSchool" uuid,
    "userId" uuid
);


ALTER TABLE public.school_taken OWNER TO postgres;

--
-- Name: section_course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.section_course (
    "sectionCourseId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "sectionNumber" text NOT NULL,
    title text NOT NULL,
    "difficultyLevel" text NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "courseIdCourse" uuid
);


ALTER TABLE public.section_course OWNER TO postgres;

--
-- Name: section_course_video; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.section_course_video (
    "idSectionCourseVideo" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "sectionCourseSectionCourseId" uuid,
    "videoCourseIdVideo" uuid
);


ALTER TABLE public.section_course_video OWNER TO postgres;

--
-- Name: subscription_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscription_plan (
    "isSubscription" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    status boolean DEFAULT true NOT NULL,
    duration integer NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid
);


ALTER TABLE public.subscription_plan OWNER TO postgres;

--
-- Name: subscriptor_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptor_plan (
    "idSubscriptor" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "dueDate" text NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "userId" uuid,
    "subscriptionPlanIsSubscription" uuid
);


ALTER TABLE public.subscriptor_plan OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "fullName" text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    roles text[] DEFAULT '{user}'::text[] NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: video_course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video_course (
    "idVideo" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title text NOT NULL,
    url text NOT NULL,
    link text NOT NULL,
    "thumbnailUrl" text NOT NULL,
    "previewAnimation" text NOT NULL,
    description text NOT NULL,
    number text NOT NULL,
    status boolean DEFAULT true NOT NULL
);


ALTER TABLE public.video_course OWNER TO postgres;

--
-- Name: video_taken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.video_taken (
    "idVideoTaken" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "videoCourseIdVideo" uuid,
    "userId" uuid
);


ALTER TABLE public.video_taken OWNER TO postgres;

--
-- Data for Name: application_subscription; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.application_subscription ("idApplicationSubscription", subscription, status, "applicationWebIdApplicationWeb", "subscriptionPlanIsSubscription") FROM stdin;
\.


--
-- Data for Name: application_web; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.application_web ("idApplicationWeb", title, description, slug, status) FROM stdin;
\.


--
-- Data for Name: ask_video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ask_video ("idAskVideo", title, description, status, "userId", "videoCourseIdVideo") FROM stdin;
\.


--
-- Data for Name: certificate_course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certificate_course ("idCertificatedCourse", status, "courseIdCourse", "userId") FROM stdin;
\.


--
-- Data for Name: certificate_school; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certificate_school ("idCertificateSchool", status, "userId") FROM stdin;
\.


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course ("idCourse", title, description, slug, logo, "frontPage", status, "updatedAt", "userId") FROM stdin;
a0146bdf-f20c-4d44-a0ea-489978c8a57a	Curso de Introducción a las Finanzas Corporativas	Unas buenas finanzas corporativas son la base del éxito de cualquier organización. Aprende en qué consisten y cómo pueden ayudarte a analizar la situación financiera de tu empresa y a tomar mejores decisiones.\n\nConoce qué es un balance general y un estado de resultados\nRealiza un análisis financiero corporativo\nEntiende el valor del dinero en el tiempo mediante indicadores como razones financieras y tasas de interés	intro-finanzas-corporativas	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-introduccion-finanzas-corporativas-ed6faaf5-7d89-42b8-905f-3cedb8d92167.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://mdstrm.com/thumbs/512e13acaca1ebcd2f000279/2018125/thumb_5a69edfe412a4d0a58726fcf_original_176s.jpg	t	2023-09-12 13:07:28.083329	42b17599-6554-4026-bd54-4cfee9103f1a
5005c3e4-b160-41d4-99bc-d71901b571e4	Curso de Planeación Financiera	Proyectar el futuro de un negocio requiere de conocer, interpretar y analizar datos para tomar decisiones. Aprende el proceso de planeación financiera para crear valor a futuro en tu modelo de negocio.\n\nDefine el objetivo financiero de una empresa\nConoce herramientas para el análisis de un negocio\nEstructura y proyecta estados financieros	planeacion-financiera	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-planeacion-financiera-01bfc531-c444-4af7-8cc7-a5935e91e8d2.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://thumbs.cdn.mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_61537c2aa8c91b0833838b07_61537c2aa8c91b0833838b13_34s.jpg	t	2023-09-12 13:08:52.249777	42b17599-6554-4026-bd54-4cfee9103f1a
ee653991-6405-4720-af51-93bdfd0b9c4f	Curso de Matemáticas Financieras	Aprende a tomar decisiones sobre tu dinero con matemáticas financieras, comprende los diferentes tipos de tasas de interés y entiende el valor del dinero en el tiempo a través de ejercicios prácticos.\n\nConoce los tipos de tasas de interés y cómo calcularlos.\nEntiende cómo calcular el valor del dinero en el tiempo.\nIdentifica qué son las anualidades y amortizaciones y cómo calcularlas.	matematicas-financieras	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-matematicas-fin-266769e8-d8d4-4a2f-b364-5f8d1fa44075.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://thumbs.cdn.mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_632b7eea15a2d95ec520bd7b_632b7eea15a2d95ec520bd87_14s.jpg	t	2023-09-12 13:10:09.422937	42b17599-6554-4026-bd54-4cfee9103f1a
dd6bbca4-23d2-4e19-8711-6b23f1d4a30d	Curso de Introducción a Educación Financiera	Conoce cómo funciona el sistema económico y tu participación en él para empezar a construir unas finanzas personales sanas.\n\nDescubre cómo manejar tus finanzas de forma racional\nIdentifica las fuerzas que mueven la economía\nComprende cómo funciona el Banco Central y los ciclos económicos\nAprende sobre transacciones, mercado, crédito y deuda	intro-finanzas	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-intro-finanzas-personales-1-a7981616-171e-4398-89a4-77d204dbea3d.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_5fc1dbae6f036207a54013e9_5fc1dbae6f036207a54013f5_71s.jpg	t	2023-09-12 13:11:20.900538	42b17599-6554-4026-bd54-4cfee9103f1a
9143d327-00c3-448f-8db2-6d711d174d24	Curso de Economía del Comportamiento	La economía del comportamiento estudia cómo los factores psicológicos, sociales o cognitivos afectan nuestras decisiones. Es decir, la diferencia entre lo que “deberíamos” hacer y lo que realmente hacemos. Aprende a usarla a tu favor, ya sea como consumidor o dentro de tu empresa.\n\nUtiliza los nudges (pequeños empujones) para tomar mejores decisiones\nMejora la forma en que manejas los riesgos e incertidumbre\nConoce cómo los sesgos cognitivos influyen en nuestras decisiones	economia-del-comportamiento	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/piezas-economia-comportamiento_badge-3d633524-372a-425d-9d83-5d25e3a65a5a.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://thumbs.cdn.mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_6230f4ed5ed2fb0935870bd6_6230f4ed5ed2fb0935870be2_41s.jpg	t	2023-09-12 13:12:41.773288	42b17599-6554-4026-bd54-4cfee9103f1a
69c2521b-705f-4c66-b545-0788987c83c6	Audiocurso de Introducción a la Economía Conductual	La economía conductual explica cómo los factores psicológicos, sociales o cognitivos influyen en nuestras decisiones financieras. Toma el control de tus finanzas personales con las herramientas que te ofrece este audiocurso.\n\nIdentifica y transforma tus heridas financieras\nConoce cómo influyen los sesgos cognitivos en tus decisiones financieras\nComprende el papel de las emociones en tus finanzas	economia-conductual	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/piezas-introduccion-economia-conductual_badge-e69a45f9-1667-4fea-ac9e-de96fd43da26.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://thumbs.cdn.mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_61d757ddf05ff6083422ce24_61d757ddf05ff6083422ce30_45s.jpg	t	2023-09-12 13:13:21.331677	42b17599-6554-4026-bd54-4cfee9103f1a
9e6b4a13-fce9-43a1-929e-d21db0f2bf48	Curso de Cómo Hacer un Pitch en Inglés para Levantar Capital	Aprende a hacer el pitch en inglés de tu proyecto o startup. Conoce la anatomía de un pitch exitoso, las herramientas verbales y no verbales que tienes para hacer un pitch convincente. Verás qué métricas debes tomar en cuenta al momento de presentar tu pitch.\n\nDesarrolla tu comunicación no verbal\nOptimiza el pitch de tu startup.\nCrea un pitch deck exitoso.	pitch-ingles	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/pitch-ingles-badge-1249d0ef-2b9e-4bb6-a158-425b07f1e963.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_60c3abc9df0fcc181f8c9fb8_60c3abc9df0fcc181f8c9fc4_17s.jpg	t	2023-09-12 13:14:38.981193	42b17599-6554-4026-bd54-4cfee9103f1a
1b2a364b-7340-464c-9fb6-02d10bde207c	Curso para Ventas y Negocios en Inglés	Al finalizar el curso podrás llevar a cabo el proceso de ventas y negociación completamente en inglés, usarás el vocabulario correcto y las expresiones comunes y conocerás las estrategias que junto con lo anterior te llevarán a un desempeño exitoso hablando 100% en inglés.\n\nCerrar ventas y presentar resultados\nSeleccionar prospectos y empezar una negociación\nHacer presentaciones memorables para los clientes\nDescubrir vocabulario especializado para ventas y negociaciones	ingles-ventas-negocios	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/piezas-ingles-ventas-negocios_badge-b90e1dcf-c9d9-4ed7-87a0-0b457faa9839.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_5f7814f841f65209268da121_5f7814f941f65209268da12d_32s.jpg	t	2023-09-12 13:15:34.748731	42b17599-6554-4026-bd54-4cfee9103f1a
\.


--
-- Data for Name: course_instructor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_instructor ("idCourseInstructor", status, "courseIdCourse", "instructorIdInstructor") FROM stdin;
d9575ed8-80e3-4289-9d13-61c5789b4afa	t	a0146bdf-f20c-4d44-a0ea-489978c8a57a	26d4c977-a524-4f4e-88c0-f4b950642fb5
ca2a24f1-dd64-4d75-a929-ce39cc6219a3	t	5005c3e4-b160-41d4-99bc-d71901b571e4	97139af6-1390-4fae-bd13-9c6eed6597f8
de5e7789-00d0-4818-b693-80415d7d0cdb	f	5005c3e4-b160-41d4-99bc-d71901b571e4	fec9566e-bbb0-4025-906f-96eccb644b73
846c08df-618b-46c0-962c-13660e4ec06f	t	ee653991-6405-4720-af51-93bdfd0b9c4f	e805386b-baff-4ead-8b87-7302ec5f0d50
cf86e863-95bd-4a3a-a3ea-e0e4ae1a5f07	t	dd6bbca4-23d2-4e19-8711-6b23f1d4a30d	fec9566e-bbb0-4025-906f-96eccb644b73
ef292d8a-8d96-4a71-99ab-a094a035e4c1	f	dd6bbca4-23d2-4e19-8711-6b23f1d4a30d	0b3e5eaf-6e75-4de6-9975-b58a7fedab7e
8ad7ff97-067b-4e34-88de-718c7d0a7e1a	t	9143d327-00c3-448f-8db2-6d711d174d24	26d4c977-a524-4f4e-88c0-f4b950642fb5
260287ca-9d34-4255-beff-422eab85f91f	t	9143d327-00c3-448f-8db2-6d711d174d24	97139af6-1390-4fae-bd13-9c6eed6597f8
85a856b7-0b2c-4a4d-bf12-4fa6264d5e69	t	69c2521b-705f-4c66-b545-0788987c83c6	fec9566e-bbb0-4025-906f-96eccb644b73
ef3ec604-8c8a-4c25-b883-3b98eee1bed2	t	9e6b4a13-fce9-43a1-929e-d21db0f2bf48	fec9566e-bbb0-4025-906f-96eccb644b73
d481a2d8-2221-4a0f-8903-973d8f050ac2	t	9e6b4a13-fce9-43a1-929e-d21db0f2bf48	d86e7fd5-dffb-42fd-8495-663cc1fe5a04
20782996-0860-4058-b2b8-08afb4ea51dd	t	1b2a364b-7340-464c-9fb6-02d10bde207c	97139af6-1390-4fae-bd13-9c6eed6597f8
a6aeea7b-2a4f-4da6-9b21-7aaaf9111344	t	1b2a364b-7340-464c-9fb6-02d10bde207c	fec9566e-bbb0-4025-906f-96eccb644b73
adb9dcd4-ad02-4643-b524-9e1c98d4be6c	f	1b2a364b-7340-464c-9fb6-02d10bde207c	d86e7fd5-dffb-42fd-8495-663cc1fe5a04
\.


--
-- Data for Name: course_school; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_school ("idCourseSchool", status, "updatedAt", "schoolIdSchool", "courseIdCourse") FROM stdin;
\.


--
-- Data for Name: course_taken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_taken ("idCourseTaken", status, "courseIdCourse", "userId") FROM stdin;
\.


--
-- Data for Name: instructor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.instructor ("idInstructor", "imgUrl", title, status, "userId") FROM stdin;
0b3e5eaf-6e75-4de6-9975-b58a7fedab7e	https://yt3.googleusercontent.com/ytc/AOPolaRSwFJEGgQu8V26chPkzDVgwaq7cTXKyglLcp-oAg=s900-c-k-c0x00ffffff-no-rj	Analista de sistemas	t	5fe64c63-d3cb-46a2-b7e4-9d66f9814a32
d86e7fd5-dffb-42fd-8495-663cc1fe5a04	https://media.licdn.com/dms/image/D4D03AQHZSOLtpZ7j0g/profile-displayphoto-shrink_800_800/0/1681249928899?e=2147483647&v=beta&t=26vGJB-5urJquJ5_rDNV8Eb1cpbQaU-97tdikY-Q2As	Programador	t	42b17599-6554-4026-bd54-4cfee9103f1a
e805386b-baff-4ead-8b87-7302ec5f0d50	data:image/jpeg;base64,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	Lic. en matemáticas	t	12c2489b-9537-4dfc-8f31-d219e0013377
fec9566e-bbb0-4025-906f-96eccb644b73	https://media.licdn.com/dms/image/D4D03AQFSihU07-lbbw/profile-displayphoto-shrink_800_800/0/1692117885718?e=2147483647&v=beta&t=iXLYM8-kWs1yz1PYyC19AfynAfbOvG5qz7F19hNL7-M	CEO de Innovance	t	4fbb7245-e7e5-4f93-91b2-a13a6d4fb6d8
26d4c977-a524-4f4e-88c0-f4b950642fb5	https://media.licdn.com/dms/image/C4E03AQH8CPNC0ctLHw/profile-displayphoto-shrink_800_800/0/1632963691818?e=2147483647&v=beta&t=HCcZlCDhY1y1f_bH1IiZd3v5hFtZWPUbmcIPuG5X0a0	Lic. en economía	t	9d8d162d-5405-4354-8eb0-28379bd9b1af
97139af6-1390-4fae-bd13-9c6eed6597f8	https://caracoltv.brightspotcdn.com/dims4/default/e839f50/2147483647/strip/true/crop/1022x1024+0+0/resize/1000x1002!/quality/90/?url=http%3A%2F%2Fcaracol-brightspot.s3.amazonaws.com%2F7c%2Fef%2F2bc75421486bb540a816de91e193%2Ffreddy-vega.png	Analista Técnico financiero	t	4bc61cf0-6c36-4ca8-9019-c455981daf47
\.


--
-- Data for Name: learning_route; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_route ("idLearningRoute", title, "isOfficialRoute", "isPrivate", status) FROM stdin;
\.


--
-- Data for Name: learning_route_course_learning_route; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_route_course_learning_route ("idLearningRouteCourseLearningRoute", status, "courseIdCourse", "learningRouteIdLearningRoute") FROM stdin;
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notification ("idNotification", "dateTime", title, description, url, viewed, status, "userId") FROM stdin;
\.


--
-- Data for Name: resource_video_course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resource_video_course ("idResourceVideoCourse", title, description, url, status, "videoCourseIdVideo") FROM stdin;
\.


--
-- Data for Name: school; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.school ("idSchool", title, description, slug, "updatedAt", status, "userId", "certificateSchoolIdCertificateSchool") FROM stdin;
\.


--
-- Data for Name: school_taken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.school_taken ("idSchoolTaken", status, "schoolIdSchool", "userId") FROM stdin;
\.


--
-- Data for Name: section_course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.section_course ("sectionCourseId", "sectionNumber", title, "difficultyLevel", status, "courseIdCourse") FROM stdin;
51ac4ebd-b915-455c-873b-4e091817fb3e	1	Introducción a la planeación financiera	Bajo	t	5005c3e4-b160-41d4-99bc-d71901b571e4
47ce0ca4-6200-4b1c-a3e7-31ee6d368d3a	2	Planear financieramente y definir valor	Intermedio	t	5005c3e4-b160-41d4-99bc-d71901b571e4
20794f29-e82d-4b72-854b-70e54b716022	3	Estados financieros	Intermedio	t	5005c3e4-b160-41d4-99bc-d71901b571e4
43aabd61-8be8-4c97-b9fd-9cd8bc986dba	4	Medir valor creado	Avanzado	t	5005c3e4-b160-41d4-99bc-d71901b571e4
894c10fa-e5bb-42e2-8d43-a3e09abbaa7e	1	Introducción a las finanzas corporativas	Bajo	t	a0146bdf-f20c-4d44-a0ea-489978c8a57a
102d6f9d-c7d9-4dad-b671-0905736a873a	2	El valor del dinero en el tiempo	Medio	t	a0146bdf-f20c-4d44-a0ea-489978c8a57a
303345c5-cf26-4551-9172-7cf4a323210e	3	Ejercicios del dinero en el tiempo	Intermedio	t	a0146bdf-f20c-4d44-a0ea-489978c8a57a
058d6d1e-cac8-430b-82bd-0ed965ec0167	4	Análisis financiero corporativo	Avanzado	t	a0146bdf-f20c-4d44-a0ea-489978c8a57a
91bddad3-b669-450d-9e85-e9e929e65916	5	Modelos financieros	Alto	t	a0146bdf-f20c-4d44-a0ea-489978c8a57a
86250db5-0a6e-4e81-a599-029547a87628	6	Valuación de proyectos	Alto	t	a0146bdf-f20c-4d44-a0ea-489978c8a57a
78265e88-5e6d-493d-a242-de285cb0f63c	7	Recomendaciones	bajo	t	a0146bdf-f20c-4d44-a0ea-489978c8a57a
\.


--
-- Data for Name: section_course_video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.section_course_video ("idSectionCourseVideo", status, "updatedAt", "sectionCourseSectionCourseId", "videoCourseIdVideo") FROM stdin;
bae328ff-bdc8-46f1-8e96-d7fed8468d14	t	2023-09-12 13:24:16.655962	51ac4ebd-b915-455c-873b-4e091817fb3e	4a8c08a7-0e15-4674-87fe-eb04f556de90
39768c3e-551c-43f8-a649-f1cdf250e2d7	t	2023-09-12 13:25:32.977695	51ac4ebd-b915-455c-873b-4e091817fb3e	f65bec92-6eda-49bf-96e7-76ffa9447749
9081fbd0-ead1-4a0a-b4b9-0b01c884863d	t	2023-09-12 14:11:13.125694	894c10fa-e5bb-42e2-8d43-a3e09abbaa7e	48e9e2ff-28fc-4fb7-8c29-5fe4d04aa943
1041443e-0f9b-408e-8627-3088cf2743e9	t	2023-09-12 14:11:45.154085	894c10fa-e5bb-42e2-8d43-a3e09abbaa7e	7601f36a-896c-4caf-9a67-1792d36196e9
\.


--
-- Data for Name: subscription_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscription_plan ("isSubscription", title, description, price, status, duration, "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: subscriptor_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscriptor_plan ("idSubscriptor", "dueDate", status, "userId", "subscriptionPlanIsSubscription") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, "fullName", "isActive", roles) FROM stdin;
fabeca89-ef44-4c4d-9a3f-eb97a08e7af0	mariovalle@gmail.com	$2b$10$Qis15hFibVc8OzfeRU1l6.tbl5WMx8saZVEogCKwd5lsOSqqyVJ5q	Mario Valle	t	{user}
3afd9279-8436-490a-ab9b-9f9287a86af6	jaimereinoso@gmail.com	$2b$10$oCrs13puAfHJHUSRM6cz2.wuwti9rGZbQECHMUzI5c/Z0kov3Iqfm	Jaime Felipe Reinoso Varela	t	{user}
4adfe03a-a1a4-4077-9edc-6812cb2c190a	julietavenegas@gmail.com	$2b$10$emxiVo1cKXcphyP/hLAr3eXCoVHS01XFicYXSSt94TWhDuEtnyROe	Juelieta Venegas	t	{user}
a1ea1a24-8f28-4cb3-adf0-846b39c0b421	eduardoteam@gmail.com	$2b$10$NpcGkroxqBtaMEl0zX9Kr.qBbnLuvAqxrxYvR5Wsx2BIkPNHsmzSO	Eduardo Team	t	{instructor,user}
4d75ea26-b242-4f70-a2b0-e6a6288b37dd	alvarofelipe@gmail.com	$2b$10$IC9geKGe1wgy1Spa4foMj.Sb26pFuaIxsmMNOB3lp0niqXZOZlPuS	Alvaro Felipe	t	{instructor,user,admin}
5fe64c63-d3cb-46a2-b7e4-9d66f9814a32	fernandoherrera@gmail.com	$2b$10$TZuMcuRrLIQ4pglCOjSDTut1jfIdYnD94Wibt1RvizZOFwmwIWR52	Fernando Herrera	t	{instructor,user}
4bc61cf0-6c36-4ca8-9019-c455981daf47	freddyvega@gmail.com	$2b$10$8tgcX3KBP16/yW2uTdWaeOtcGlBHyTMjSwJ0b.5/zKBH14OE5XmtC	Freddy Vega	t	{instructor,user}
12c2489b-9537-4dfc-8f31-d219e0013377	manuelaperez@gmail.com	$2b$10$K8DyrWZzvmTM6Hvool3AsuZWuU61q9/5LolcdMRML8EFdfAeybDvC	Manuela Varela	t	{instructor,user}
42b17599-6554-4026-bd54-4cfee9103f1a	leandro1@google.com	$2b$10$sfui7/ukT1bExAB9.1ibpuTqhh5a71cYYlRq4CVQtWJ4Blfv1Ta6y	Leandro Tomassini	t	{instructor,user,admin}
9d8d162d-5405-4354-8eb0-28379bd9b1af	fiammatomassini@gmail.com	$2b$10$dETkm87sGyEPZigZGa0f/eLpwNV5xxL4FPW62ZZXlo2jk/McttG9O	Fiamma Tomassini	t	{user}
4fbb7245-e7e5-4f93-91b2-a13a6d4fb6d8	emilianolasia@gmail.com	$2b$10$K3XUj1Lvdp8o9AyMN4KAguzuwIi6OeavQ4M1EomAZFEZu6pOH4kJG	Emiliano Lasia Draiman	t	{instructor,user,admin}
\.


--
-- Data for Name: video_course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video_course ("idVideo", title, url, link, "thumbnailUrl", "previewAnimation", description, number, status) FROM stdin;
4a8c08a7-0e15-4674-87fe-eb04f556de90	Introducción a la planeación financiera	introduccion	https://iframe.mediadelivery.net/embed/138804/7d5776e1-8fff-4e8a-8831-48a237fa823e?autoplay=true			Para los que van a iniciar este curso, recomiendo verlo en velocidad 0.85x desde el inicio, es demasiado denso, mas adelante se puede complicar y consulten en google cuando no conozcan un termino o algo no entiendan.	1	t
f65bec92-6eda-49bf-96e7-76ffa9447749	Instalaciones necesarias para seguir el curso	instalaciones	https://iframe.mediadelivery.net/embed/138804/7d5776e1-8fff-4e8a-8831-48a237fa823e?autoplay=true			La importancia de la planeación\n\nLa administración se anticipa al futuro a través de la planeación, evaluando el resultado económico de diferentes alternativas.\n\nObjetivo\n\nAl finalizar este curso tendrás los fundamentos teóricos y técnicos para realizar la planeación financiera de tu proyecto.	2	t
48e9e2ff-28fc-4fb7-8c29-5fe4d04aa943	Bienvenido al curso	introduccion	https://iframe.mediadelivery.net/embed/138804/7d5776e1-8fff-4e8a-8831-48a237fa823e?autoplay=true			— ¿Qué son las finanzas corporativas?\nSe refiera a la administracion de los activos en la empresa, para medir los rendimientos de la organizacion.	1	t
7601f36a-896c-4caf-9a67-1792d36196e9	Instructor del curso	instructor	https://iframe.mediadelivery.net/embed/138804/7d5776e1-8fff-4e8a-8831-48a237fa823e?autoplay=true			Soy Contador Público egresado de la Universidad de los Andes (Venezuela) y me alegra encontrar un curso donde puedo repasar todos los conceptos vistos en mi carrera.	2	t
\.


--
-- Data for Name: video_taken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video_taken ("idVideoTaken", status, "videoCourseIdVideo", "userId") FROM stdin;
\.


--
-- Name: video_taken PK_26651d5792c9728f53aa133a258; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_taken
    ADD CONSTRAINT "PK_26651d5792c9728f53aa133a258" PRIMARY KEY ("idVideoTaken");


--
-- Name: course_taken PK_2dc3062f919d64aa6c07a70dea3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_taken
    ADD CONSTRAINT "PK_2dc3062f919d64aa6c07a70dea3" PRIMARY KEY ("idCourseTaken");


--
-- Name: application_subscription PK_35cf9e2b402fe8e6c5342817263; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_subscription
    ADD CONSTRAINT "PK_35cf9e2b402fe8e6c5342817263" PRIMARY KEY ("idApplicationSubscription");


--
-- Name: instructor PK_3794600bebff16f053b28430051; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructor
    ADD CONSTRAINT "PK_3794600bebff16f053b28430051" PRIMARY KEY ("idInstructor");


--
-- Name: section_course PK_42d666fcf66de39e203e0c49916; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_course
    ADD CONSTRAINT "PK_42d666fcf66de39e203e0c49916" PRIMARY KEY ("sectionCourseId");


--
-- Name: section_course_video PK_459b476a577c6fb9903801b2fa1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_course_video
    ADD CONSTRAINT "PK_459b476a577c6fb9903801b2fa1" PRIMARY KEY ("idSectionCourseVideo");


--
-- Name: certificate_school PK_709b58f56b45db3610fbd70d5fe; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate_school
    ADD CONSTRAINT "PK_709b58f56b45db3610fbd70d5fe" PRIMARY KEY ("idCertificateSchool");


--
-- Name: learning_route PK_799b775fed14c480ed0386dc853; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_route
    ADD CONSTRAINT "PK_799b775fed14c480ed0386dc853" PRIMARY KEY ("idLearningRoute");


--
-- Name: subscriptor_plan PK_83d17ea26c83f5e2454b600b3ff; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptor_plan
    ADD CONSTRAINT "PK_83d17ea26c83f5e2454b600b3ff" PRIMARY KEY ("idSubscriptor");


--
-- Name: course_school PK_847313b2433777c6d66a5f30f86; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_school
    ADD CONSTRAINT "PK_847313b2433777c6d66a5f30f86" PRIMARY KEY ("idCourseSchool");


--
-- Name: learning_route_course_learning_route PK_8578fa1a35460ee8ee007ed8a8b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_route_course_learning_route
    ADD CONSTRAINT "PK_8578fa1a35460ee8ee007ed8a8b" PRIMARY KEY ("idLearningRouteCourseLearningRoute");


--
-- Name: video_course PK_8e39ebd19f5fdb62d4d97d71181; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_course
    ADD CONSTRAINT "PK_8e39ebd19f5fdb62d4d97d71181" PRIMARY KEY ("idVideo");


--
-- Name: school_taken PK_8e67c5b8843c16753b1109d3635; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school_taken
    ADD CONSTRAINT "PK_8e67c5b8843c16753b1109d3635" PRIMARY KEY ("idSchoolTaken");


--
-- Name: notification PK_9bc001d272e2115b6646a9489a1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "PK_9bc001d272e2115b6646a9489a1" PRIMARY KEY ("idNotification");


--
-- Name: resource_video_course PK_9e612a5808a4765cc26e23cf712; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resource_video_course
    ADD CONSTRAINT "PK_9e612a5808a4765cc26e23cf712" PRIMARY KEY ("idResourceVideoCourse");


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: course_instructor PK_b26568c6bac09fdca814bd6e5dc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_instructor
    ADD CONSTRAINT "PK_b26568c6bac09fdca814bd6e5dc" PRIMARY KEY ("idCourseInstructor");


--
-- Name: certificate_course PK_bf185ba73eeac3b15e38bc1791f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate_course
    ADD CONSTRAINT "PK_bf185ba73eeac3b15e38bc1791f" PRIMARY KEY ("idCertificatedCourse");


--
-- Name: ask_video PK_d132a17aad97508a022327bc315; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ask_video
    ADD CONSTRAINT "PK_d132a17aad97508a022327bc315" PRIMARY KEY ("idAskVideo");


--
-- Name: school PK_d9458f5db6565e20f870c021f0a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT "PK_d9458f5db6565e20f870c021f0a" PRIMARY KEY ("idSchool");


--
-- Name: subscription_plan PK_e5e6ab9f2376b7d29753acdf08f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscription_plan
    ADD CONSTRAINT "PK_e5e6ab9f2376b7d29753acdf08f" PRIMARY KEY ("isSubscription");


--
-- Name: course PK_fb6d2462c2813f9f564f82ed2c9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "PK_fb6d2462c2813f9f564f82ed2c9" PRIMARY KEY ("idCourse");


--
-- Name: application_web PK_fd13fcfcac8190ffa4852a039af; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_web
    ADD CONSTRAINT "PK_fd13fcfcac8190ffa4852a039af" PRIMARY KEY ("idApplicationWeb");


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: school FK_065d8d144bc7f8e21a21984a358; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT "FK_065d8d144bc7f8e21a21984a358" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: course_taken FK_1031af55cfd7a038c3caf9b1b5f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_taken
    ADD CONSTRAINT "FK_1031af55cfd7a038c3caf9b1b5f" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: section_course_video FK_139b36696ea50017c4aba82af42; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_course_video
    ADD CONSTRAINT "FK_139b36696ea50017c4aba82af42" FOREIGN KEY ("sectionCourseSectionCourseId") REFERENCES public.section_course("sectionCourseId");


--
-- Name: notification FK_1ced25315eb974b73391fb1c81b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: ask_video FK_2792c5795ebf141cd72b4d1d562; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ask_video
    ADD CONSTRAINT "FK_2792c5795ebf141cd72b4d1d562" FOREIGN KEY ("videoCourseIdVideo") REFERENCES public.video_course("idVideo");


--
-- Name: course_instructor FK_2c715eb1cfb21e17d5879a5082d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_instructor
    ADD CONSTRAINT "FK_2c715eb1cfb21e17d5879a5082d" FOREIGN KEY ("courseIdCourse") REFERENCES public.course("idCourse");


--
-- Name: subscription_plan FK_2fddaf7e01e59236ebbe59c4590; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscription_plan
    ADD CONSTRAINT "FK_2fddaf7e01e59236ebbe59c4590" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: course_school FK_35069057db6de92a7fc0299538e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_school
    ADD CONSTRAINT "FK_35069057db6de92a7fc0299538e" FOREIGN KEY ("schoolIdSchool") REFERENCES public.school("idSchool");


--
-- Name: application_subscription FK_3eb93100de69b301cc549d3e68c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_subscription
    ADD CONSTRAINT "FK_3eb93100de69b301cc549d3e68c" FOREIGN KEY ("subscriptionPlanIsSubscription") REFERENCES public.subscription_plan("isSubscription");


--
-- Name: certificate_course FK_40d0e299ec49160b9a95d630f43; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate_course
    ADD CONSTRAINT "FK_40d0e299ec49160b9a95d630f43" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: video_taken FK_4684dff520750f61bc61bd274eb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_taken
    ADD CONSTRAINT "FK_4684dff520750f61bc61bd274eb" FOREIGN KEY ("videoCourseIdVideo") REFERENCES public.video_course("idVideo");


--
-- Name: school FK_49f570505461a5664505a5be0de; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school
    ADD CONSTRAINT "FK_49f570505461a5664505a5be0de" FOREIGN KEY ("certificateSchoolIdCertificateSchool") REFERENCES public.certificate_school("idCertificateSchool");


--
-- Name: section_course FK_4d9a7fff11ad11e9d3b27c973c9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_course
    ADD CONSTRAINT "FK_4d9a7fff11ad11e9d3b27c973c9" FOREIGN KEY ("courseIdCourse") REFERENCES public.course("idCourse");


--
-- Name: video_taken FK_5110beb6873add8617a88c03d0f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.video_taken
    ADD CONSTRAINT "FK_5110beb6873add8617a88c03d0f" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: course_instructor FK_5626c2533df15408b1f38173623; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_instructor
    ADD CONSTRAINT "FK_5626c2533df15408b1f38173623" FOREIGN KEY ("instructorIdInstructor") REFERENCES public.instructor("idInstructor");


--
-- Name: application_subscription FK_67e000b601d7bcce63d90ad9337; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.application_subscription
    ADD CONSTRAINT "FK_67e000b601d7bcce63d90ad9337" FOREIGN KEY ("applicationWebIdApplicationWeb") REFERENCES public.application_web("idApplicationWeb");


--
-- Name: resource_video_course FK_68182002612d215328a94b42d57; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resource_video_course
    ADD CONSTRAINT "FK_68182002612d215328a94b42d57" FOREIGN KEY ("videoCourseIdVideo") REFERENCES public.video_course("idVideo");


--
-- Name: school_taken FK_6c7222d6976b89981b652ca6068; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school_taken
    ADD CONSTRAINT "FK_6c7222d6976b89981b652ca6068" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: section_course_video FK_7848b29dd7c03902d970c74a4ca; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.section_course_video
    ADD CONSTRAINT "FK_7848b29dd7c03902d970c74a4ca" FOREIGN KEY ("videoCourseIdVideo") REFERENCES public.video_course("idVideo");


--
-- Name: ask_video FK_8477cd4ac6ba0cfbc740c09e9b5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ask_video
    ADD CONSTRAINT "FK_8477cd4ac6ba0cfbc740c09e9b5" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: certificate_course FK_9131ee56fe0d79480cff7606e5d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate_course
    ADD CONSTRAINT "FK_9131ee56fe0d79480cff7606e5d" FOREIGN KEY ("courseIdCourse") REFERENCES public.course("idCourse");


--
-- Name: instructor FK_a914853943da2844065d6e5c383; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructor
    ADD CONSTRAINT "FK_a914853943da2844065d6e5c383" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: course_school FK_ac46b1a35d8bed08f127ed0d6f5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_school
    ADD CONSTRAINT "FK_ac46b1a35d8bed08f127ed0d6f5" FOREIGN KEY ("courseIdCourse") REFERENCES public.course("idCourse");


--
-- Name: learning_route_course_learning_route FK_b87fd558fa85e25062e3741f75d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_route_course_learning_route
    ADD CONSTRAINT "FK_b87fd558fa85e25062e3741f75d" FOREIGN KEY ("learningRouteIdLearningRoute") REFERENCES public.learning_route("idLearningRoute");


--
-- Name: course FK_bceb52bbd16679020822f6d6f5d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "FK_bceb52bbd16679020822f6d6f5d" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: certificate_school FK_c1cd13919a8dc5a4303626bcf03; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate_school
    ADD CONSTRAINT "FK_c1cd13919a8dc5a4303626bcf03" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: subscriptor_plan FK_c25f04a1ec2d86caeb805f9755e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptor_plan
    ADD CONSTRAINT "FK_c25f04a1ec2d86caeb805f9755e" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: subscriptor_plan FK_df1e2cec065751f0f07756ad4f9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptor_plan
    ADD CONSTRAINT "FK_df1e2cec065751f0f07756ad4f9" FOREIGN KEY ("subscriptionPlanIsSubscription") REFERENCES public.subscription_plan("isSubscription");


--
-- Name: school_taken FK_e159be8c69b5026637f4d5f6a13; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.school_taken
    ADD CONSTRAINT "FK_e159be8c69b5026637f4d5f6a13" FOREIGN KEY ("schoolIdSchool") REFERENCES public.school("idSchool");


--
-- Name: course_taken FK_eca4934abbc92e646a136d61234; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_taken
    ADD CONSTRAINT "FK_eca4934abbc92e646a136d61234" FOREIGN KEY ("courseIdCourse") REFERENCES public.course("idCourse");


--
-- Name: learning_route_course_learning_route FK_f7f18a2fd1eaaaf8cc6225f0260; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_route_course_learning_route
    ADD CONSTRAINT "FK_f7f18a2fd1eaaaf8cc6225f0260" FOREIGN KEY ("courseIdCourse") REFERENCES public.course("idCourse");


--
-- PostgreSQL database dump complete
--

