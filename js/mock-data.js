const mockPhotos = [
  {
    id: 1,
    url: 'https://example.com/photo1.jpg',
    description: 'Красивый закат на море',
    likes: 156,
    comments: [
      {
        id: 1,
        avatar: 'img/avatar-1.svg',
        name: 'Анна',
        message: 'Отличное фото!'
      },
      {
        id: 2,
        avatar: 'img/avatar-2.svg',
        name: 'Михаил',
        message: 'Очень красиво'
      }
    ]
  },
  {
    id: 2,
    url: 'https://example.com/photo2.jpg',
    description: 'Горный пейзаж',
    likes: 89,
    comments: [
      {
        id: 3,
        avatar: 'img/avatar-3.svg',
        name: 'Сергей',
        message: 'Великолепно!'
      }
    ]
  },
  {
    id: 3,
    url: 'https://example.com/photo3.jpg',
    description: 'Город ночью',
    likes: 234,
    comments: [
      {
        id: 4,
        avatar: 'img/avatar-4.svg',
        name: 'Елена',
        message: 'Классный кадр!'
      },
      {
        id: 5,
        avatar: 'img/avatar-5.svg',
        name: 'Дмитрий',
        message: 'Люблю ночные фото'
      },
      {
        id: 6,
        avatar: 'img/avatar-6.svg',
        name: 'Ольга',
        message: 'Отличное качество'
      }
    ]
  }
];

export { mockPhotos };
