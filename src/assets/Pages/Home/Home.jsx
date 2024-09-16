import { useState ,useEffect} from 'react'
import axios from 'axios'
import { Link,Outlet } from 'react-router-dom'
import './Home.css'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
function Home(){
    const[books,setBooks]=useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 20; // Number of books per page
    const [totalItems, setTotalItems] = useState(0);
    const totalPages = Math.ceil(totalItems / booksPerPage);
    useEffect(()=>{
      const fetchBooks=async()=>{
        try{
          const response= await axios.get(`https://www.googleapis.com/books/v1/volumes?q=books&maxResults=${booksPerPage}&startIndex=${(currentPage - 1) * booksPerPage}`)
          const getBooks=response.data.items;
          setBooks(getBooks)
          console.log(response.data.items)
          setTotalItems(response.data.totalItems); 
        }
        catch(err)
        {
          console.log(err)
        }
      }
      fetchBooks();
    }, [currentPage])
    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };
    const handleSearchSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      if (searchTerm.trim() === '') {
       
        return;
      }
  
      try {
        
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
        setBooks(response.data.items);
     
      } catch (err) {
       
        console.log(err)
      }
    };
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
    const renderStars = (rating) => {
      const fullStars = Math.floor(rating); // Full stars
      const halfStar = rating % 1 !== 0; // If the rating is not a whole number, there will be a half star
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining stars are empty
  
      return (
        <div id="rating">
          {/* Full stars */}
          {[...Array(fullStars)].map((_, index) => (
            <FaStar key={`full-star-${index}`} style={{ color: '#ffc107' }} />
          ))}
  
          {/* Half star */}
          {halfStar && <FaStarHalfAlt style={{ color: '#ffc107' }} />}
  
          {/* Empty stars */}
          {[...Array(emptyStars)].map((_, index) => (
            <FaRegStar key={`empty-star-${index}`} style={{ color: '#ffc107' }} />
          ))}
        </div>
      );
    };
    return(
      <div className="container">
        <div id="sidebar">
        <Link to ="/">Home</Link>
        <Link to="/ScienceFiction">ScienceFiction</Link>
        <Link to="/Programming">Programming</Link>
        <Link to="/Engineering">Engineering</Link>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for a book"
            value={searchTerm}
            onChange={handleInputChange}
            style={{
              padding: '8px',
            }}
          />
          <button id="submit"
            type="submit">
            Search
          </button>
        </form>
       
          
        </div>
        <Outlet></Outlet>
 <div id="homePage" >
      {books.map((book,index)=>{
        return(
            <div key={book.id+ index} className='book' >
                <h1>{book.volumeInfo.title}</h1>
                <img 
                  src={book.volumeInfo.imageLinks?.thumbnail} // Display book thumbnail
                  alt={book.volumeInfo.title} 
                 
                />
                {book.volumeInfo.averageRating ? (
              <div id="rating">
                 Ratings:  {renderStars(book.volumeInfo.averageRating)}
                
              </div>
            ) : (
             null
            )}
                   <div className="hover">
                    <Link to={`/book/${book.id}`}>
                    <button id="more">
                      More
                    </button>
                    </Link>
                   </div>
            </div>
            
        )
      })}
      <div className="pagination" >
          <button className='btn'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ padding: '10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            Previous
          </button>

          <p style={{ padding: '10px' }}>Page {currentPage} of {totalPages}</p>

          <button className='btn'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ padding: '10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next
          </button>
        </div>
        </div>
        
      </div>
       
    )
}
export default Home