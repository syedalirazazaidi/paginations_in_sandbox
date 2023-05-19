import "./styles.css";
import {useEffect,useState} from 'react'


export default function App() {
  const [data, setData] = useState(null);
  const [page,setPage]=useState(1)

  useEffect(() => {
    // Function to make the API call
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);
  const changepagination=(selectedPage)=>{
    setPage(selectedPage)

  }
  return (
    <div className="App">
    {data ? (
        <ul>
          {data.slice(page*10-10,page*10).map(item => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      {
       data?.length>0 && <div className='pagination'>
       
         <span>⏮</span>
        
        {
          [...Array(data?.length/10)].map((_,i)=>{
            return <span onClick={()=>changepagination(i+1)} key={i}>{i+1}</span>
          })
        }
         <span>⏭</span>
        

       </div> 
      }
    </div>
  );
}
