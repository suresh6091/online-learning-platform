 Online Learning Platform
Description: A platform where users can enroll in courses, track their progress, and take quizzes. Admins can manage course content and user enrollments.
Features:
Users can enroll in courses and complete lessons.
Admins can create, edit, or delete courses and manage user registrations.
Super Admins can oversee all course content and user interactions.

##telwind css

                       User Flow                                                 Admin Flow

                [User Visits Home Page]                                   [Admin Visits Dashboard]
                          |                                                            |
                          v                                                            v
                [Check if User is Authenticated]                              [Check if Admin is Authenticated]
                          |                                                            |
                    +-----+-----+                                                +-----+-----+
                    |           |                                                |           |
                   Yes          No                                               Yes         No
                    |            |                                                |           |
                    v            v                                                v           v
          [Load User Dashboard]  [Show Login Page]                         [Load Admin Dashboard] [Show Admin Login Page]
                    |                                                            |
                    v                                                            v
         [User Selects Course]                                             [Choose Action]
                    |                                                            |
                    v                                        +-------------------+-------------------------+
          [Display Course Details]                           |                                             |
                    |                                [Manage Courses]                               [Manage Users]
                    v                                        |                                             |
          [Enroll in Course]                                v                                             v
                    |                              [Create New Course]                         [View User Registrations]
                    v                                        |                                             |
             [Track Progress]                                v                                             |
                    |                              [Edit Course Details] <-----------------------------+ 
                    v                                        |                                             |
             [Complete Quiz]                                 v                                             |
                    |                              [Delete Course]                                        |
                    v                                        |                                             |
             [Submit Results]                                v                                             |
                    |                              [View Course Enrollments]                              |
                    v                                        |                                             |
            [Show Results]                                   v                                             |
                                                            [Track Course Performance] <------------------+
                                                               |
                                                               v
                                                      [View Quiz Statistics]
                                                               |
                                                               v
                                                      [Generate Reports]
                                                               |
                                                               v
                                                           [Log Out]

