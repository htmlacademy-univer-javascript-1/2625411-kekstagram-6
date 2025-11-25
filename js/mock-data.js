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
      },
      {
        id: 3,
        avatar: 'img/avatar-3.svg',
        name: 'Сергей',
        message: 'Великолепный закат'
      },
      {
        id: 4,
        avatar: 'img/avatar-4.svg',
        name: 'Елена',
        message: 'Хочу туда поехать'
      },
      {
        id: 5,
        avatar: 'img/avatar-5.svg',
        name: 'Дмитрий',
        message: 'Какие цвета!'
      },
      {
        id: 6,
        avatar: 'img/avatar-6.svg',
        name: 'Ольга',
        message: 'Просто потрясающе'
      },
      {
        id: 7,
        avatar: 'img/avatar-1.svg',
        name: 'Иван',
        message: 'Лучшее фото дня'
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
        id: 8,
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
        id: 9,
        avatar: 'img/avatar-4.svg',
        name: 'Елена',
        message: 'Классный кадр!'
      },
      {
        id: 10,
        avatar: 'img/avatar-5.svg',
        name: 'Дмитрий',
        message: 'Люблю ночные фото'
      },
      {
        id: 11,
        avatar: 'img/avatar-6.svg',
        name: 'Ольга',
        message: 'Отличное качество'
      },
      {
        id: 12,
        avatar: 'img/avatar-1.svg',
        name: 'Анна',
        message: 'Какой красивый город'
      },
      {
        id: 13,
        avatar: 'img/avatar-2.svg',
        name: 'Михаил',
        message: 'Огни большого города'
      }
    ]
  }
];

export { mockPhotos };
