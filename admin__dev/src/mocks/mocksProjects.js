import coverImage1 from '../assets/images/projects/coverImage1.png'
import coverImage2 from '../assets/images/projects/coverImage2.png'
import coverImage3 from '../assets/images/projects/coverImage3.png'
import coverImage4 from '../assets/images/projects/coverImage4.png'
import screen2 from '../assets/images/projects/screen2.png'
import coverImage5 from '../assets/images/projects/coverImage5.png'
import coverImage6 from '../assets/images/projects/coverImage6.png'
import coverImage8 from '../assets/images/projects/coverImage8.png'

export const mocksProjects = [
    {
        id: 1,
        title: 'Айдар',
        categories: ['Телехикая','Мультфильм'],
        type: 'Series',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 7,
        keywords: ['Тачка', 'Авто', 'Мульт'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T18:30:00Z',
        updatedAt: '2021-04-04T18:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 1,
            episodes: [
                { seasons: 1, episode: 1, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 2, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 3, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 4, videoId: 'vPQy7H-i3ww&t'},
            ]
        },
        media: {
            coverImage: coverImage1,
            screenShots: []
        },
        stats: {
            views: 15201,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 2,
        title: 'Суперкөлік Самұрық',
        categories: ['Телехикая','Мультсериал'],
        type: 'Series',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 7,
        keywords: ['Тачка', 'Авто', 'Мульт'],
        description: 'Шытырман оқиғалы мультсериал Елбасының «Ұлы даланың жеті қыры» бағдарламасы аясында жүзеге асырылған. Мақалада қызғалдақтардың отаны Қазақстан екені айтылады. Ал, жоба қызғалдақтардың отаны – Алатау баурайы екенін анимация тілінде дәлелдей түседі. If you want to increase your knowledge of 3D design with Aarón, you can also take some of his other courses: Characters in Cinema 4D: from the Sketch to 3D Printing, Prototypes and Product Viewing in Cinema 4D, Compositions with Cinema 4D and OctaneRender, 3D Illustration with 4D Cinema 4D.',
        director: 'Бақдәулет Әлімбеков',
        producer: 'Сандуғаш Кенжебаева',
        createdAt: '2021-04-04T18:30:00Z',
        updatedAt: '2021-04-04T18:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 3,
            episodes: [
                { seasons: 1, episode: 1, videoId: 'vPQy7H-i3ww&t00000'},
                { seasons: 1, episode: 2, videoId: 'vPQy7H-i3ww&t10'},
                { seasons: 1, episode: 3, videoId: 'vPQy7H-i3ww&t11'},
                { seasons: 1, episode: 4, videoId: 'vPQy7H-i3ww&t12'},
                { seasons: 1, episode: 5, videoId: 'vPQy7H-i3ww&t13'},
                { seasons: 1, episode: 6, videoId: 'vPQy7H-i3ww&t14'},
                { seasons: 1, episode: 7, videoId: 'vPQy7H-i3ww&t15'},
                { seasons: 1, episode: 8, videoId: 'vPQy7H-i3ww&t16'},
                { seasons: 1, episode: 9, videoId: 'vPQy7H-i3ww&t17'},
                { seasons: 1, episode: 10, videoId: 'vPQy7H-i3ww&t18'},
                { seasons: 1, episode: 11, videoId: 'vPQy7H-i3ww&t19'},
                { seasons: 1, episode: 12, videoId: 'vPQy7H-i3ww&t1820'},
                { seasons: 1, episode: 13, videoId: 'vPQy7H-i3ww&t185'},
                { seasons: 1, episode: 14, videoId: 'vPQy7H-i3ww&t185'},
                { seasons: 2, episode: 1, videoId: 'vPQy7H-i3ww&t19'},
                { seasons: 2, episode: 2, videoId: 'vPQy7H-i3ww&t20'},
                { seasons: 3, episode: 1, videoId: 'vPQy7H-i3ww&t21'}
            ]
        },
        media: {
            coverImage: coverImage2,
            screenShots: [ screen2, screen2, screen2, screen2, screen2, screen2, screen2, screen2, screen2 ]
        },
        stats: {
            views: 10329,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 3,
        title: 'Каникулы off-line 2',
        categories: ['Телехикая'],
        type: 'Movie',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 180,
        keywords: ['Тачка', 'Авто'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T18:30:00Z',
        updatedAt: '2021-04-04T18:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 0,
            episodes: {videoId: 'vPQy7H-i3ww&t' }
        },
        media: {
            coverImage: coverImage3,
            screenShots: []
        },
        stats: {
            views: 9659,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 4,
        title: 'Ойыншықтар',
        categories: ['Телехикая'],
        type: 'Movie',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 60,
        keywords: ['Тачка', 'Мульт'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 0,
            episodes: []
        },
        media: {
            coverImage: coverImage4,
            screenShots: []
        },
        stats: {
            views: 9659,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 5,
        title: 'Айдар',
        categories: ['Телехикая','Мультфильм'],
        type: 'Series',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 7,
        keywords: ['Тачка', 'Авто', 'Мульт'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 1,
            episodes: [
                { seasons: 1, episode: 1, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 2, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 3, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 4, videoId: 'vPQy7H-i3ww&t'},
            ]
        },
        media: {
            coverImage: coverImage5,
            screenShots: []
        },
        stats: {
            views: 15201,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 6,
        title: 'Ойыншықтар',
        categories: ['Телехикая'],
        type: 'Movie',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 60,
        keywords: ['Тачка', 'Мульт'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 0,
            episodes: []
        },
        media: {
            coverImage: coverImage6,
            screenShots: []
        },
        stats: {
            views: 9659,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 7,
        title: 'Суперкөлік Самұрық',
        categories: ['Телехикая','Мультсериал'],
        type: 'Series',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 7,
        keywords: ['Тачка', 'Авто', 'Мульт'],
        description: 'Шытырман оқиғалы мультсериал Елбасының «Ұлы даланың жеті қыры» бағдарламасы аясында жүзеге асырылған. Мақалада қызғалдақтардың отаны Қазақстан екені айтылады. Ал, жоба қызғалдақтардың отаны – Алатау баурайы екенін анимация тілінде дәлелдей түседі. If you want to increase your knowledge of 3D design with Aarón, you can also take some of his other courses: Characters in Cinema 4D: from the Sketch to 3D Printing, Prototypes and Product Viewing in Cinema 4D, Compositions with Cinema 4D and OctaneRender, 3D Illustration with 4D Cinema 4D.',
        director: 'Бақдәулет Әлімбеков',
        producer: 'Сандуғаш Кенжебаева',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 3,
            episodes: [
                { seasons: 1, episode: 1, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 2, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 3, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 4, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 5, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 6, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 7, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 8, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 9, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 10, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 2, episode: 1, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 2, episode: 2, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 3, episode: 1, videoId: 'vPQy7H-i3ww&t'}
            ]
        },
        media: {
            coverImage: screen2,
            screenShots: [ screen2, screen2, screen2, screen2, screen2, screen2, screen2, screen2, screen2 ]
        },
        stats: {
            views: 10329,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 8,
        title: 'Каникулы off-line 2',
        categories: ['Телехикая'],
        type: 'Movie',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 180,
        keywords: ['Тачка', 'Авто'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 0,
            episodes: []
        },
        media: {
            coverImage: coverImage8,
            screenShots: []
        },
        stats: {
            views: 9659,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 9,
        title: 'Айдар',
        categories: ['Телехикая','Мультфильм'],
        type: 'Series',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 7,
        keywords: ['Тачка', 'Авто', 'Мульт'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 1,
            episodes: [
                { seasons: 1, episode: 1, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 2, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 3, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 4, videoId: 'vPQy7H-i3ww&t'},
            ]
        },
        media: {
            coverImage: coverImage5,
            screenShots: []
        },
        stats: {
            views: 15201,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 10,
        title: 'Ойыншықтар',
        categories: ['Телехикая'],
        type: 'Movie',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 60,
        keywords: ['Тачка', 'Мульт'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 0,
            episodes: []
        },
        media: {
            coverImage: coverImage6,
            screenShots: []
        },
        stats: {
            views: 9659,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 11,
        title: 'Суперкөлік Самұрық',
        categories: ['Телехикая','Мультсериал'],
        type: 'Series',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 7,
        keywords: ['Тачка', 'Авто', 'Мульт'],
        description: 'Шытырман оқиғалы мультсериал Елбасының «Ұлы даланың жеті қыры» бағдарламасы аясында жүзеге асырылған. Мақалада қызғалдақтардың отаны Қазақстан екені айтылады. Ал, жоба қызғалдақтардың отаны – Алатау баурайы екенін анимация тілінде дәлелдей түседі. If you want to increase your knowledge of 3D design with Aarón, you can also take some of his other courses: Characters in Cinema 4D: from the Sketch to 3D Printing, Prototypes and Product Viewing in Cinema 4D, Compositions with Cinema 4D and OctaneRender, 3D Illustration with 4D Cinema 4D.',
        director: 'Бақдәулет Әлімбеков',
        producer: 'Сандуғаш Кенжебаева',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 3,
            episodes: [
                { seasons: 1, episode: 1, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 2, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 3, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 4, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 5, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 6, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 7, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 8, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 9, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 10, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 2, episode: 1, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 2, episode: 2, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 3, episode: 1, videoId: 'vPQy7H-i3ww&t'}
            ]
        },
        media: {
            coverImage: screen2,
            screenShots: [ screen2, screen2, screen2, screen2, screen2, screen2, screen2, screen2, screen2 ]
        },
        stats: {
            views: 10329,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 12,
        title: 'Каникулы off-line 2',
        categories: ['Телехикая'],
        type: 'Movie',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 180,
        keywords: ['Тачка', 'Авто'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 0,
            episodes: []
        },
        media: {
            coverImage: coverImage8,
            screenShots: []
        },
        stats: {
            views: 9659,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 13,
        title: 'Айдар',
        categories: ['Телехикая','Мультфильм'],
        type: 'Series',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 7,
        keywords: ['Тачка', 'Авто', 'Мульт'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 1,
            episodes: [
                { seasons: 1, episode: 1, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 2, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 3, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 4, videoId: 'vPQy7H-i3ww&t'},
            ]
        },
        media: {
            coverImage: coverImage5,
            screenShots: []
        },
        stats: {
            views: 15201,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 14,
        title: 'Ойыншықтар',
        categories: ['Телехикая'],
        type: 'Movie',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 60,
        keywords: ['Тачка', 'Мульт'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 0,
            episodes: []
        },
        media: {
            coverImage: coverImage6,
            screenShots: []
        },
        stats: {
            views: 9659,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 15,
        title: 'Суперкөлік Самұрық',
        categories: ['Телехикая','Мультсериал'],
        type: 'Series',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 7,
        keywords: ['Тачка', 'Авто', 'Мульт'],
        description: 'Шытырман оқиғалы мультсериал Елбасының «Ұлы даланың жеті қыры» бағдарламасы аясында жүзеге асырылған. Мақалада қызғалдақтардың отаны Қазақстан екені айтылады. Ал, жоба қызғалдақтардың отаны – Алатау баурайы екенін анимация тілінде дәлелдей түседі. If you want to increase your knowledge of 3D design with Aarón, you can also take some of his other courses: Characters in Cinema 4D: from the Sketch to 3D Printing, Prototypes and Product Viewing in Cinema 4D, Compositions with Cinema 4D and OctaneRender, 3D Illustration with 4D Cinema 4D.',
        director: 'Бақдәулет Әлімбеков',
        producer: 'Сандуғаш Кенжебаева',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 3,
            episodes: [
                { seasons: 1, episode: 1, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 2, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 3, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 4, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 5, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 6, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 7, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 8, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 9, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 1, episode: 10, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 2, episode: 1, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 2, episode: 2, videoId: 'vPQy7H-i3ww&t'},
                { seasons: 3, episode: 1, videoId: 'vPQy7H-i3ww&t'}
            ]
        },
        media: {
            coverImage: screen2,
            screenShots: [ screen2, screen2, screen2, screen2, screen2, screen2, screen2, screen2, screen2 ]
        },
        stats: {
            views: 10329,
            favorites: 4,
            shares: 43,

        }
    },
    {
        id: 16,
        title: 'Каникулы off-line 2',
        categories: ['Телехикая'],
        type: 'Movie',
        ageCategories: ['8-10', '10-12'],
        year: 2020,
        duration: 180,
        keywords: ['Тачка', 'Авто'],
        description: '',
        director: '',
        producer: '',
        createdAt: '2021-04-04T21:30:00Z',
        updatedAt: '2021-04-04T21:30:00Z',
        createdBy: 'Admin',
        video: {
            seasons: 0,
            episodes: []
        },
        media: {
            coverImage: coverImage8,
            screenShots: []
        },
        stats: {
            views: 9659,
            favorites: 4,
            shares: 43,

        }
    },

]