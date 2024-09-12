import  { useEffect, useState } from 'react';
import { useParams ,Link} from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css'
function BookDetails()
{
  const { id } = useParams(); // Get the book ID from the route
  const [book, setBook] = useState(null);
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(response.data);
       console.log(response.data)
      } catch (err) {
     console.log(err)
      }
    };

    fetchBookDetails();
  }, [id]);
  
  if (!book || !book.volumeInfo) return <p>No book details found</p>;
    return(

        <div id="Details">
          <div id="image">
          <img
        src={book.volumeInfo.imageLinks?.thumbnail}
    
        className='image'
      />
      
          </div>
          <div id="about">
          <h1><strong>{book.volumeInfo.title}</strong></h1>
          <label ><strong>Authors:</strong>{book.volumeInfo.authors}</label>
      <p><strong>Description:</strong> {book.volumeInfo.description}</p>
      <label><strong>Page Count:</strong> {book.volumeInfo.pageCount}</label>
      <label><strong>Publisher:</strong> {book.volumeInfo.publisher}</label>
      <label><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</label>
    
      <Link to={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
        <button id ="read">Read Book</button>
      </Link>
          </div>
           
      
        </div>
    )
}
export default BookDetails