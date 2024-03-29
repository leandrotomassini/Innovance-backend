import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { SubscriptorPlanModule } from './subscriptor-plan/subscriptor-plan.module';
import { SchoolModule } from './school/school.module';
import { CourseModule } from './course/course.module';
import { InstructorModule } from './instructor/instructor.module';
import { AskVideoModule } from './ask-video/ask-video.module';
import { VideoTakenModule } from './video-taken/video-taken.module';
import { CourseTakenModule } from './course-taken/course-taken.module';
import { CertificateCourseModule } from './certificate-course/certificate-course.module';
import { SchoolTakenModule } from './school-taken/school-taken.module';
import { NotificationModule } from './notification/notification.module';
import { CertificateSchoolModule } from './certificate-school/certificate-school.module';
import { CourseInstructorModule } from './course-instructor/course-instructor.module';
import { ApplicationSubscriptionModule } from './application-subscription/application-subscription.module';
import { ApplicationWebModule } from './application-web/application-web.module';
import { LearningRouteCourseLearningRouteModule } from './learning-route-course-learning-route/learning-route-course-learning-route.module';
import { LearningRouteModule } from './learning-route/learning-route.module';
import { CourseSchoolModule } from './course-school/course-school.module';
import { SectionCourseModule } from './section-course/section-course.module';
import { VideoCourseModule } from './video-course/video-course.module';
import { ResourceVideoCourseModule } from './resource-video-course/resource-video-course.module';
import { SectionCourseVideoModule } from './section-course-video/section-course-video.module';
import { VideoCommentModule } from './video-comment/video-comment.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      // ssl: true
    }),
    CommonModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    AuthModule,
    MessagesWsModule,
    SubscriptionPlanModule,
    SubscriptorPlanModule,
    SchoolModule,
    CourseModule,
    InstructorModule,
    AskVideoModule,
    VideoTakenModule,
    CourseTakenModule,
    CertificateCourseModule,
    SchoolTakenModule,
    NotificationModule,
    CertificateSchoolModule,
    CourseInstructorModule,
    ApplicationSubscriptionModule,
    ApplicationWebModule,
    LearningRouteCourseLearningRouteModule,
    LearningRouteModule,
    CourseSchoolModule,
    SectionCourseModule,
    VideoCourseModule,
    ResourceVideoCourseModule,
    SectionCourseVideoModule,
    VideoCommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
