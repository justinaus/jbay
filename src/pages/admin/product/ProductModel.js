export default class ProductModel {
  constructor() {
    // 수정 가능.
    this.id = '';
    this.userId = '';
    this.title = '';
    this.completed = '';
  }

  getData() {
    // 서버에 보낼 형태로.
    const ret = {
      id: this.id,
      userId: this.userId,
      title: this.title.trim(),
      completed: this.completed === 'Y',
    };

    return ret;
  }

  setData(obj) {
    // 서버에서 데이터를 받아서, 컴포넌트에서 사용할 형태로.
    const { id, userId, title, completed } = obj;

    if (id) this.id = id;
    if (userId) this.userId = userId;
    if (title) this.title = title;
    this.completed = completed ? 'Y' : 'N';
  }
}
