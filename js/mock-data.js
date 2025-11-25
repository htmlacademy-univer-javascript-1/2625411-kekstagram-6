const mockPhotos = [
  {
    id: 1,
    url: 'https://example.com/photo1.jpg',
    description: 'Красивый закат на море',
    likes: 156,
    comments: [
      { id: 1, text: 'Отличное фото!', author: 'user1' },
      { id: 2, text: 'Очень красиво', author: 'user2' }
    ]
  },
  {
    id: 2,
    url: 'https://example.com/photo2.jpg',
    description: 'Горный пейзаж',
    likes: 89,
    comments: [
      { id: 3, text: 'Великолепно!', author: 'user3' }
    ]
  },
  {
    id: 3,
    url: 'https://example.com/photo3.jpg',
    description: 'Город ночью',
    likes: 234,
    comments: [
      { id: 4, text: 'Классный кадр!', author: 'user4' },
      { id: 5, text: 'Люблю ночные фото', author: 'user5' },
      { id: 6, text: 'Отличное качество', author: 'user6' }
    ]
  }
];

export { mockPhotos };
