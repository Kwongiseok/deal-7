import ImageCard from './ImageCard/ImageCard.js';

export default function ImageCardList({ $target, onDeleteImageHandler, imageUrls }) {
  this.state = {
    imageUrls,
  };
  this.$imageCardList = document.createElement('ul');
  this.onDeleteImageHandler = onDeleteImageHandler;

  $target.appendChild(this.$imageCardList);
  this.$imageCardList.addEventListener('click', (e) => {
    const deleteButton = e.target.closest('button');
    onDeleteImageHandler(deleteButton.dataset.name);
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$imageCardList.innerHTML = '';
    Object.keys(this.state.imageUrls).forEach((index) => {
      const file = Object.entries(this.state.imageUrls[index]); // ['name', 'url']
      new ImageCard({ $target: this.$imageCardList, fileName: file[0][0], imageUrl: file[0][1] });
    });
  };

  this.render();
}
