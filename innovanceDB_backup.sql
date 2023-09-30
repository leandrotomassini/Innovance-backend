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
c79a8a32-fe54-460d-84e4-6c76310f21d1	Curso de Introducción al Trading	Aprende desde cero los conceptos básicos de cómo funcionan los mercados bursátiles y el trading de stocks o acciones como una alternativa real de inversión que puedes integrar a tu patrimonio.\n\nRealiza simulaciones de trading en diferentes plataformas.\nConoce el funcionamiento del mercado de acciones, trading y de inversión.\nDomina los conceptos básicos del trading.	trading-basico	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/1403-5739eea5-5dc1-46d8-bc02-0df8c54d4b54.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_5cdb408acbe7cc07596b2fdc_5cdb408acbe7cc07596b2fe0_59s.jpg	t	2023-09-18 17:46:07.904816	16da2d5f-d49c-4ece-9b13-79534b8751f1
1b574369-ae58-4cee-8362-0714d3e4f2b3	Introducción a Excel para Principiantes	Conoce el funcionamento básico de Excel y la utilidad que tiene. Aprende sobre los elementos principales de Excel y cómo dar formato a un documento de hojas de cálculo.\n\nDa formato a tu hoja de trabajo.\nCrea hojas de trabajo desde cero.\nConoce las principales funciones de Excel.	excel-intro	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-intro-excel-f275c912-2bb8-4ba0-b737-899620b3e2bc.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://thumbs.cdn.mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_6230f4ed5ed2fb0935870bd6_6230f4ed5ed2fb0935870be2_41s.jpg	t	2023-09-18 17:47:43.318576	16da2d5f-d49c-4ece-9b13-79534b8751f1
ffee9aca-7504-4d25-a856-b2bcc26293d1	 Curso de Cómo Armar un Portafolio de Inversión con Vest	Aprende más sobre diversificación en inversiones en este interesante curso traído a ti en colaboración con Vest. Entiende los conceptos básicos de inversión, cómo conocer y cómo puede afectar tu perfil de inversionista a la creación de tu cartera y aprende a utilizar un simulador de bolsa para poder practicar tus estrategias de inversión.\n\nReconocer y aplicar los conceptos básicos de inversión.\nConocer y definir tu perfil de inversionista.\nPoner en práctica tus estrategias de inversión.	portafolio-inversion-vest	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/armar-portafolio-inversion-vest_piezas_badge-e38144e6-aca0-48d2-b242-5b745f13287e.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://thumbs.cdn.mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_61537dabed1e910835452c4a_61537dabed1e910835452c56_62s.jpg	t	2023-09-18 17:48:37.945266	16da2d5f-d49c-4ece-9b13-79534b8751f1
1199221e-877f-4fc0-a746-77e8520f7fc0	Curso para Invertir en Bolsa: Análisis Fundamental	El análisis fundamental te ayudará a evaluar los estados financieros de una empresa a través de índices microeconómicos. Ser capaz de determinar el valor intrínseco de una acción te permite tomar decisiones de inversión inteligentes basadas en datos.\n\nAprende a detectar empresas con potencial de inversión.\nConoce cómo evaluar la liquidez de una empresa.\nEntiende los estados financieros de una empresa.	inversion-bolsa	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/piezas-invertir-bolsa-analisis-fundamental-2023_badge-a41ccaa5-15b0-4cb9-b923-4c6e7.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://thumbs.cdn.mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_632b7eea15a2d95ec520bd7b_632b7eea15a2d95ec520bd87_14s.jpg	t	2023-09-18 17:49:47.043818	16da2d5f-d49c-4ece-9b13-79534b8751f1
8833b594-6e98-4e32-8336-6dccad6fe826	Curso de Introducción al Análisis Técnico de Mercados Financieros	Descubre las propiedades del análisis técnico para tomar mejores decisiones de inversión basadas en el comportamiento de los principales mercados financieros.\n\nEstudia herramientas que te permitan a través del análisis realizar tus primeras proyecciones\nAnaliza las principales fuentes de información en el precio\nAprende los fundamentos de acción de precio y análisis de un activo	analisis-tecnico	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/piezas-introduccion-analisis-tecnico-mercados-financieros_badge-b66ca956-0784-4be4-.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_5f566ccbe9fdcb0715c00ff6_5f566ccbe9fdcb0715c01002_7s.jpg	t	2023-09-18 17:51:36.35806	16da2d5f-d49c-4ece-9b13-79534b8751f1
80214f48-2fa6-43cd-85e8-a9d44042e34c	Curso de Inversión Intermedio para el Análisis de Riesgo Bursátil y Toma de Decisiones	Analiza los diferentes tipos de activos financieros y configura tu entorno de trabajo para realizar proyecciones que te permitan en mayor probabilidad tomar decisiones de inversión con resultados consistentes en el tiempo.\n\nAprende a gestionar tu riesgo y emociones como parte de tu estrategia de inversión\nEstudia patrones de activación que te permitan ejecutar operaciones en el mercado\nEvalúa indicadores de análisis que te permitan sumar validaciones a tus proyecciones	analisis-tecnico-practico	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/piezas-analisis-riesgo-bursatil_badge-08ec2a4f-e23c-48a1-b346-39230d944230.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://mdstrm.com/thumbs/512e13acaca1ebcd2f000279/2018125/thumb_5a69edfe412a4d0a58726fcf_original_176s.jpg	t	2023-09-18 17:52:26.832445	16da2d5f-d49c-4ece-9b13-79534b8751f1
c049a494-cc08-4441-9c55-a823520edbd3	Curso de Excel Financiero para Realizar Cálculos y Pronósticos de Una Empresa	Domina Excel para realizar cálculos y pronósticos con los datos financieros de una empresa y así poder realizar análisis que te permitan tomas mejores decisiones.\n\nEntiende como elaborar estados financieros\nConoce como realizar cálculos de intereses, amortizaciones y más\nAprende a realizar tablas dinámicas	excel-financiero	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge-excel-financiero-cc798af1-325a-4e31-9866-3c3479183129.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://thumbs.cdn.mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_63f3b9707a2965454748a261_63f3b9707a2965454748a26c_26s.jpg	t	2023-09-18 17:52:58.787925	16da2d5f-d49c-4ece-9b13-79534b8751f1
d3c79ea0-0d2f-43a0-b4dc-020388d2e5c2	Curso de Evaluación Financiera de Proyectos	Planear las finanzas de tu proyecto no es suficiente. Aprende a evaluar el desempeño de tus inversiones a través de ejercicios donde aplicarás el valor presente neto, la tasa de interés y el costo anual equivalente.\n\nComprende indicadores de evaluación financiera.\nRealizar un estudio organizacional y financiero.\nDiferencia etapas de un proyecto de inversión.\nToma decisiones de inversión en proyectos.	evaluacion-financiera	https://static.platzi.com/cdn-cgi/image/width=1024,quality=50,format=auto/media/achievements/badge_evaluacion-financiera-de-proyectos-514506d1-91d7-4ba1-b1bf-a17a56b49776.png	https://static.platzi.com/cdn-cgi/image/width=768,quality=85,format=auto/https://thumbs.cdn.mdstrm.com/thumbs/512e13acaca1ebcd2f000279/thumb_6193b48ed2e3ba0824baecfa_6193b48fd2e3ba0824baed06_29s.jpg	t	2023-09-18 17:54:39.305626	16da2d5f-d49c-4ece-9b13-79534b8751f1
\.


--
-- Data for Name: course_instructor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_instructor ("idCourseInstructor", status, "courseIdCourse", "instructorIdInstructor") FROM stdin;
ee86f01f-417a-4ebf-af44-4bc4e5d5ab10	t	c79a8a32-fe54-460d-84e4-6c76310f21d1	9f0f2553-e1a9-48db-b992-e153031830e9
4457dbc2-50f0-439c-8bb7-13036391e84a	t	1b574369-ae58-4cee-8362-0714d3e4f2b3	6c321ce9-32cd-40e4-9181-f13326243d34
7faa2783-1640-481c-8b42-386ba6057396	t	ffee9aca-7504-4d25-a856-b2bcc26293d1	6887cdda-737e-4c07-91ad-4fd946e1d8f8
f7fdae8d-5156-4ab2-9f5e-96cdaca3a49c	t	1199221e-877f-4fc0-a746-77e8520f7fc0	92e02251-1507-45f9-83f7-7c1bfb32d92f
97aa33f6-4aac-454d-abb9-025aba247982	t	8833b594-6e98-4e32-8336-6dccad6fe826	6887cdda-737e-4c07-91ad-4fd946e1d8f8
3f84037f-123d-49e9-8509-1ebafae79bb1	t	8833b594-6e98-4e32-8336-6dccad6fe826	9f0f2553-e1a9-48db-b992-e153031830e9
f3f94424-d713-4f49-9887-b62d43660d60	t	c049a494-cc08-4441-9c55-a823520edbd3	566be42a-8835-4a3f-bf4d-56fc867ebf9f
ddb8ea1e-d35d-4118-8efb-ebbb4dd7f418	t	d3c79ea0-0d2f-43a0-b4dc-020388d2e5c2	92e02251-1507-45f9-83f7-7c1bfb32d92f
81cebb3b-17dc-4cb5-aca4-c9c417455191	t	d3c79ea0-0d2f-43a0-b4dc-020388d2e5c2	6887cdda-737e-4c07-91ad-4fd946e1d8f8
d55d53e6-a3ea-4fae-9ec0-f0c7ac0b6123	t	ffee9aca-7504-4d25-a856-b2bcc26293d1	9f0f2553-e1a9-48db-b992-e153031830e9
8689cc10-2ad5-4690-8c10-ef6dadc5ade9	t	c79a8a32-fe54-460d-84e4-6c76310f21d1	6c321ce9-32cd-40e4-9181-f13326243d34
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
6887cdda-737e-4c07-91ad-4fd946e1d8f8	https://media.licdn.com/dms/image/D4D03AQFSihU07-lbbw/profile-displayphoto-shrink_200_200/0/1692117885718?e=1698883200&v=beta&t=eQNdf1sBmlyxdnn6dQOIzayUiQjj1xNe1OFn01btFrg	Lic. en negocios internacionales	t	51b912fb-bc0f-4fc8-b8e7-b5e3b2f2dcd3
6c321ce9-32cd-40e4-9181-f13326243d34	data:image/jpeg;base64,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	CEO de Platzi	t	d2cf566f-be61-4c97-870b-754629d2537b
566be42a-8835-4a3f-bf4d-56fc867ebf9f	https://media.licdn.com/dms/image/D4D03AQHZSOLtpZ7j0g/profile-displayphoto-shrink_800_800/0/1681249928899?e=2147483647&v=beta&t=26vGJB-5urJquJ5_rDNV8Eb1cpbQaU-97tdikY-Q2As	Programador	t	16da2d5f-d49c-4ece-9b13-79534b8751f1
9f0f2553-e1a9-48db-b992-e153031830e9	https://media.licdn.com/dms/image/C4E03AQH8CPNC0ctLHw/profile-displayphoto-shrink_800_800/0/1632963691818?e=2147483647&v=beta&t=HCcZlCDhY1y1f_bH1IiZd3v5hFtZWPUbmcIPuG5X0a0	Lic. en economía	t	f54151a9-be45-4e73-a213-31069f8eaa4d
92e02251-1507-45f9-83f7-7c1bfb32d92f	https://assets.codepen.io/228448/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1501389143&width=512	Lic. en matetemáticas	t	3f55a1b6-f524-45ae-b148-3360331ddcdb
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
5ef329db-9060-4e7c-a56a-68904be1cde1	1	Introducción al Curso de Trading	Básico	t	c79a8a32-fe54-460d-84e4-6c76310f21d1
d684efa5-24ef-4c62-823d-86d933c1678c	2	Antecedentes históricos: Diferentes tipos de inversión e inversionistas	intermedio	t	c79a8a32-fe54-460d-84e4-6c76310f21d1
9914859a-de6b-41c5-a94b-e9daa839f47d	3	La diferencia entre un inversionista y un trader	Avanzado	t	c79a8a32-fe54-460d-84e4-6c76310f21d1
4dfb8ce1-baa8-4a06-bb26-d897aaeb3f96	4	Introducción a los mercados bursátiles	Avanzado	t	c79a8a32-fe54-460d-84e4-6c76310f21d1
9729e49a-533c-42c6-acd8-56c07003dd79	5	Mercados Bursátiles	Avanzado	t	c79a8a32-fe54-460d-84e4-6c76310f21d1
893f78cd-22b3-42b9-a980-88a0b78dddf5	6	Análisis Técnico y simuladores: Trading Práctico.	Avanzado	t	c79a8a32-fe54-460d-84e4-6c76310f21d1
\.


--
-- Data for Name: section_course_video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.section_course_video ("idSectionCourseVideo", status, "updatedAt", "sectionCourseSectionCourseId", "videoCourseIdVideo") FROM stdin;
2eee5f87-5823-4fe0-ad60-2886deeace34	t	2023-09-19 14:19:03.340443	5ef329db-9060-4e7c-a56a-68904be1cde1	c097860e-e3b0-4ec4-9837-10e806e42298
565cee6c-aaf9-4ab7-aeb2-01db43086e3e	t	2023-09-19 14:20:28.727378	5ef329db-9060-4e7c-a56a-68904be1cde1	dadf0949-d5fa-420c-a342-53affedbe576
af1351ce-bbd8-4178-913d-5b54dab6c0fb	t	2023-09-19 14:21:35.556063	5ef329db-9060-4e7c-a56a-68904be1cde1	0f743d7f-35f8-4769-b3b5-7b6d9aebe7c5
88a84652-f904-4812-92b8-624c026a3034	t	2023-09-19 14:22:36.121243	d684efa5-24ef-4c62-823d-86d933c1678c	ddade371-0596-417f-917b-494a86d51c8c
7401a3f4-03a9-4d13-9e59-7b8f1d5b7ec7	t	2023-09-19 14:23:24.699728	d684efa5-24ef-4c62-823d-86d933c1678c	a8ee92c7-64b4-48ce-8b70-c678aa3ede4f
73c71c9a-0d47-40f8-b426-8882697c378d	t	2023-09-19 14:24:13.095531	d684efa5-24ef-4c62-823d-86d933c1678c	0981ecfe-fa2b-48e7-ae75-3dad6080869a
a4400042-e259-4fde-a74e-533e3538dba1	t	2023-09-19 14:25:04.460865	d684efa5-24ef-4c62-823d-86d933c1678c	b28d64e6-6565-49f9-8cf3-3083bc27739a
af6fe9bc-55b5-4c13-be01-e69674d9103f	f	2023-09-29 20:27:11.692263	5ef329db-9060-4e7c-a56a-68904be1cde1	75e6a9ec-fbac-4512-9d37-add473dffd6e
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
f54151a9-be45-4e73-a213-31069f8eaa4d	fiammatomassini@google.com	$2b$10$omtUGDRxkcGTEFu2nJ6xWeDmzSV/527dXRjwQdXEgdY8mJdRkF9Da	Fiamma Tomassini	t	{user}
143a8075-18a8-4266-927d-051e6670382a	juancarlos@google.com	$2b$10$Q.ZT7fAW.keUevCZfkkOheHrtIvNnWQXxsTblvN3SniYWuAJeXRLe	Juan Carlos Valdez	t	{user}
6265546e-c021-46e4-8374-a5372d45bfd1	humbertovelez@google.com	$2b$10$iRIDhM5fNxawzC10YctBtuihYpFS9hXUIiM14.ipEDOZs5j9KFpeu	Humberto Vélez	t	{user}
e7a65ef3-6b58-46af-ba14-151c0e0ca78a	carlosvillagran@google.com	$2b$10$nzbFvKuoCjrRCbN45mRFouOyLVJsr6N4OndRLZx60P/uN0AFir8EG	Carlos Villagran	t	{user}
6ebc1725-d8ba-4ef8-9bf7-7a2daae5a10f	anabelisamartinez@google.com	$2b$10$F6pz.j.U0idKwzqGlvvW7uvi0TXaaXpZk/n953qPC9QynvBxWDMoe	Anala Belisa Martinez	t	{user}
c387cbe8-4368-4da2-888d-f4846f2c9e5a	italomorales@google.com	$2b$10$ovZPxyxUHaOaT4bWu3yiueAUBxT8HTtE72GnHnVfZoH4xeBtR0rlq	Italo Morales F.	t	{user}
e6253560-009c-4398-852e-93ee80cc7d7d	juanmerelo@google.com	$2b$10$4UQIPkJefCDfBZaNNQrucu2dnr.wpqECDiu9sOSYXKbdDa0k/tn7G	Juan Julián Merelo	t	{user}
3f55a1b6-f524-45ae-b148-3360331ddcdb	alvarofelipe@google.com	$2b$10$TN9/apWllGgHBfOE6X1p6eE9vFXHq7I8JAJkJk2tASOR.4IqhdtZW	Alvaro Felipe	t	{instructor,user}
51b912fb-bc0f-4fc8-b8e7-b5e3b2f2dcd3	emiianolasia@google.com	$2b$10$VFFHxIyUoIj9PZGMotIK5ONgF3SUUotFf8ajkmbUEChnp.Q44fjcq	Emiliano Lasia	t	{instructor,user,admin}
68e567a8-40f5-4d1b-986b-008c735aeb98	fernandoherrera@google.com	$2b$10$BSf6vWEaWinOxeXfujGsUOVpokc5PUY3zUHYpJKT401w.IoALUFuu	Fernando Herrera	t	{instructor,user}
d2cf566f-be61-4c97-870b-754629d2537b	fredyvega@google.com	$2b$10$xN2VBKGBr4yeqVsTrx6rkem7bjfRT7Ces/BtOs0h43ialItjiu4p6	Fredy Vega	t	{instructor,user}
16da2d5f-d49c-4ece-9b13-79534b8751f1	leandro1@google.com	$2b$10$A.Lql/dxg.x69UKA8j/7tehKef0EJXAP9uvV2dCPog0F45SKiXTRq	Leandro C. Tomassini	t	{instructor,user,admin}
\.


--
-- Data for Name: video_course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.video_course ("idVideo", title, url, link, "thumbnailUrl", "previewAnimation", description, number, status) FROM stdin;
c097860e-e3b0-4ec4-9837-10e806e42298	Todo lo que vas a aprender sobre trading	trading	<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/159263/204c6b7b-66d3-450f-ad24-92e8d2ea8703?autoplay=true&loop=false&muted=false&preload=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>	https://vz-d4e8b06f-033.b-cdn.net/204c6b7b-66d3-450f-ad24-92e8d2ea8703/thumbnail.jpg	https://vz-d4e8b06f-033.b-cdn.net/204c6b7b-66d3-450f-ad24-92e8d2ea8703/preview.webp	Aprende desde cero los conceptos básicos de cómo funcionan los mercados bursátiles y el trading de stocks o acciones como una alternativa real de inversión que puedes integrar a tu patrimonio.	1	t
dadf0949-d5fa-420c-a342-53affedbe576	Cuál es el objetivo de este curso de trading	objetivo	<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/159263/cb6b4cd5-24c9-48f6-82e6-b0b306a55dbb?autoplay=true&loop=false&muted=false&preload=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>	https://vz-d4e8b06f-033.b-cdn.net/cb6b4cd5-24c9-48f6-82e6-b0b306a55dbb/thumbnail.jpg	https://vz-d4e8b06f-033.b-cdn.net/cb6b4cd5-24c9-48f6-82e6-b0b306a55dbb/preview.webp	Módulo 1\nBreve historia de la inversión y los mercados bursátiles.\nCategorías y tipos de inversión.\nTipos de inversionista.\nMódulo 2\nInversionistas: su objetivo y estrategias\nTraders: su objetivo y estrategias\nEjemplos famosos de inversionistas y de traders\nMódulo 3\nEmpresas privadas VS Empresas públicas\nCómo funcionan los mercados Bursátiles\nTerminología y Conceptos Generales de la Bolsa\nTerminología y Conceptos Básicos de stock trading\nMódulo 4\nAnálisis Fundamental y Técnico\nAnálisis Técnico\nMódulo 5\nSimuladores de Trading\nTrading en la vida real\nConclusiones y siguientes pasos	2	t
0f743d7f-35f8-4769-b3b5-7b6d9aebe7c5	Reto: Introspectiva - Investiga quién es Jesse Livermore	Introspectiva	<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/159263/02181a63-862a-4102-8d50-bce2ae4b70e2?autoplay=true&loop=false&muted=false&preload=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>	https://vz-d4e8b06f-033.b-cdn.net/02181a63-862a-4102-8d50-bce2ae4b70e2/thumbnail.jpg	https://vz-d4e8b06f-033.b-cdn.net/02181a63-862a-4102-8d50-bce2ae4b70e2/preview.webp	Para el segundo reto, dejo por acá un “video-podcast” que nos cuenta de una manera entretenida y didáctica, quién fue JEsse Livermore. Espero sea de su gusto.	3	t
a8ee92c7-64b4-48ce-8b70-c678aa3ede4f	Breve historia de la inversión y los mercados bursátiles: Grecia	historia	<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/159263/204c6b7b-66d3-450f-ad24-92e8d2ea8703?autoplay=true&loop=false&muted=false&preload=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>	https://vz-d4e8b06f-033.b-cdn.net/204c6b7b-66d3-450f-ad24-92e8d2ea8703/thumbnail.jpg	https://vz-d4e8b06f-033.b-cdn.net/204c6b7b-66d3-450f-ad24-92e8d2ea8703/preview.webp	La influencia griega en las dinámicas de inversión. Desde esta época ya veían la noción de inversión comprando tierras de cultivos que se encontraban en problemas, los trabajaban (aumentando su valor) y posteriormente vendían las tierras a un mayor precio que les proporciona un margen de ganancia.\n\nInversión en bienes raíces en Roma. Los territorios conquistados representaban una fuente de riqueza para las élites.	5	t
0981ecfe-fa2b-48e7-ae75-3dad6080869a	Breve historia de la inversión y los mercados bursátiles: El interés y la corporación	inversion	<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/159263/02181a63-862a-4102-8d50-bce2ae4b70e2?autoplay=true&loop=false&muted=false&preload=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>	https://vz-d4e8b06f-033.b-cdn.net/02181a63-862a-4102-8d50-bce2ae4b70e2/thumbnail.jpg	https://vz-d4e8b06f-033.b-cdn.net/02181a63-862a-4102-8d50-bce2ae4b70e2/preview.webp	El interés tiene su propia línea histórica:\n\nEn Egipto, por el 300 B.C, el término hoy en día asociado a interés era percibido con el concepto de “dar vida” y con “fertilidad”.\n\nHasta Ptolomeo en el año 30 B.C, las tasas de interés bajaron de un 100% a un 25%, igualando las del naciente Imperio Romano.\n\nRoma financió gran parte de su expansión en los primeros años, gracias al movimiento préstamo-interés de la clase noble.\n\nEn la antigüedad, el comercio de larga distancia otorgaba el mayor retorno de inversión, pero también significaba gran riesgo.\n\nLa historia de los mercados bursátiles comienza con la llegada de la Corporación después del 1500 A.D, esta entidad protegía a los inversionistas del alto nivel de riesgo que presentaba una inversión en el mercado.\n\nLos franceses en el año 1100 A.D. ya tenían “corredores de bolsa” donde literalmente corrían entre bancos para comprar instrumentos de deuda.\n*La “British East India Company” , la primera que fundó el modelo de propiedad a través de acciones (share of stock).\n\nEl modelo de corporación protegía a los inversionistas. En caso de pérdida, solamente debían pagar la parte (acción) que habían invertido.\n\nLa primer empresa en volverse pública fue la “Dutch East India Company”, para el año 1602 esta corporación holandesa puso a disposición del público inversionista sus acciones en el Amsterdam Stock Exchange.	6	t
b28d64e6-6565-49f9-8cf3-3083bc27739a	Categorías y tipos de inversión más relevantes: bienes inmuebles, productos bancarios, bonos	categorias	<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/159263/204c6b7b-66d3-450f-ad24-92e8d2ea8703?autoplay=true&loop=false&muted=false&preload=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>	https://vz-d4e8b06f-033.b-cdn.net/204c6b7b-66d3-450f-ad24-92e8d2ea8703/thumbnail.jpg	https://vz-d4e8b06f-033.b-cdn.net/204c6b7b-66d3-450f-ad24-92e8d2ea8703/preview.webp	Hemos hablado del concepto de interés y las dinámicas de inversión desde el mundo antiguo. Prácticas usureras en la edad media y renacimiento. También vimos cómo nacieron las corporaciones y los stocks.\n\nLos antecedentes históricos nos muestran cómo la bolsa de valores nace para manejar el riesgo y para buscar el desarrollo económico.\n\nLas preguntas para el primer reto del módulo se encuentran publicadas en esta clase.	7	t
75e6a9ec-fbac-4512-9d37-add473dffd6e	Probando el video	test	<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/159263/204c6b7b-66d3-450f-ad24-92e8d2ea8703?autoplay=true&loop=false&muted=false&preload=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>	https://vz-d4e8b06f-033.b-cdn.net/204c6b7b-66d3-450f-ad24-92e8d2ea8703/thumbnail.jpg	https://vz-d4e8b06f-033.b-cdn.net/204c6b7b-66d3-450f-ad24-92e8d2ea8703/preview.webp	SALUDOS A TODOS. finalmente ahora que ya está arriba el curso oficialmente, estaré concetándome para interactuar con quien tenga dudas o tenga comentarios sobre el contenido de este primer curso de trading en Platzi. Recuerdeen que éste es el primero de varios que habrá aquí	0	t
ddade371-0596-417f-917b-494a86d51c8c	Breve historia de la inversión y los mercados bursátiles: Mesopotamia	mesopotamia	<div style="position:relative;padding-top:56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/159263/02181a63-862a-4102-8d50-bce2ae4b70e2?autoplay=true&loop=false&muted=false&preload=true" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe></div>	https://vz-d4e8b06f-033.b-cdn.net/02181a63-862a-4102-8d50-bce2ae4b70e2/thumbnail.jpg	https://vz-d4e8b06f-033.b-cdn.net/02181a63-862a-4102-8d50-bce2ae4b70e2/preview.webp	Mesopotamia fue uno de los primeros grandes asentamientos humanos, siendo conocida como “cuna de la civilización” y lugar donde comenzó (casi) todo.\n\nDentro de esta civilización, por el año 2250-2000 B.C, las personas que trabajaban la tierra podían rentarla a los dueños de estas, altos oficiales religiosos y de gobierno.\n\nPara la época de la tercer dinastía de Ur, por el año 2000 B.C, el imperio recibía un\nimpuesto –de nombre “gun-mada”— en forma de renta, que se pagaba a partir de los remanentes o residuos que quedaban de lo producido en sus tierras.\n\nSi no se pagaban los impuestos había dos alternativas:\n\nGuerra.\nSe pedía una de las primeras formas, muy primitiva, de préstamo.\nEstos préstamos dieron nacimiento al interés.\n¿Cómo eran los impuestos(gun-mada) e intereses?\n¿Qué era el código de Hammurabi?	4	t
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

