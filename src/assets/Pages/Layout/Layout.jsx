import { Link, Outlet } from "react-router-dom";
import './Layout.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import  { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
function Layout() {
  const [books, setBooks] = useState([]);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:8 , // Number of books shown at once
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    
  };
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=books'
        );
        setBooks(response.data.items);
       
      } catch (err) {
       console.log(err)
      }
    };
    fetchBooks();
  }, []);
  return (
    
      <main>
        <header>
          <nav>
          <Link to ="/">Home</Link>
          <Link to="/ScienceFiction">ScienceFiction</Link>
        <Link to="/Programming">Programming</Link>
        <Link to="/Engineering">Engineering</Link>
          </nav>
          <Slider {...settings} className="Slider">
        {books.map((book, index) => (
          <div key={book.id + index} style={{ padding: '10px' }}>
            <Link to={`/book/${book.id}`}>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="img" 

              
            />
            </Link>
            <label>{book.volumeInfo.title}</label>
          </div>
        ))}
      </Slider>
        
        </header>
        <Outlet></Outlet>
        <footer>
         <p>© 2024 booklibrary. All rights reserved.</p>
       </footer>
      </main>
     
    
  );
}
export default Layout;
