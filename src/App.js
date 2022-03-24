import React from 'react'
import './App.css';
import styles from './App.module.scss'


class App extends React.Component {

  state = {
    imageId: [],
    allImages: [],
    currentNumber: 0,
  }

  componentDidMount(){
    // pobieramy liste obrazkow do wyswietlenia i pierwsze 3 id wrzucmy do stanu
    this.fetchFromPhotos();
  }

  fetchFromPhotos = async _ => {
    const photos = await fetch('https://picsum.photos/v2/list');
    const photosJson = await photos.json();
    const allImages = photosJson.map( e => e.url.split('/')[4])
    let firstImg = photosJson.slice(0, 3)
    console.log(firstImg)
    let slugs = firstImg.map( e => e.url.split('/')[4])
    console.log(slugs)
    this.setState({
      imageId: slugs,
      allImages: allImages,
      currentNumber: 3
    })
  }

  nextImg(){
    const nextImages = this.state.allImages.slice(this.state.currentNumber, this.state.currentNumber+3)
    this.setState({
      imageId: [...this.state.imageId, ...nextImages],
      currentNumber: this.state.currentNumber + 3,
    })
  }
   
  render(){ 
    return(
      <div className="App" id="app">
        <div className={styles.imageWrapper}>
          {this.state.imageId.map(img => (
            <img alt={img} key={img} className={styles.image} src={`http://source.unsplash.com/${img}`}/>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.btn} onClick={() => this.nextImg()}><span className={styles.btnText}> Get next 3</span></button>
        </div>
      </div>
    )
  }
}

export default App;