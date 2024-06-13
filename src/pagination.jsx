import { useEffect, useState } from "react";
import "./styles.css"


const Pagination = () => {

    const [ pageContent, setPageContent ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 10;

    
     const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"

     useEffect(()=>{
            fetch(URL)
                .then((res) => res.json())
                .then((data) => setPageContent(data))
                .catch((e) => alert('Failed to fetch data'));
    },[] )

    console.log(pageContent);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pageContent.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(pageContent.length / itemsPerPage);

    const handlePrevious = () => {
        if(currentPage > 1){
            setCurrentPage((prev) => prev - 1)
        }
    }

    const handleNext = () => {
        if(currentPage < totalPages){
            setCurrentPage((prev) => prev + 1)
        }
    }

    if(pageContent.length === 0){
        return <p>Data Loading...</p>;
    }


    return (
        <div>
            <h1 style={{padding: "10px", textAlign: "center"}}>Employee Data Table</h1>
            <table>
                <thead>
                    <tr>
                        {Object.keys(pageContent[0]).map((key) => (
                            <th key={key}>{key.toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, idx) => (
                                    <td key={idx}>{value}</td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePrevious} disabled = {currentPage === 1}>Previous</button>
                <span>{currentPage}</span>
                <button onClick={handleNext} disabled = {currentPage === totalPages}>Next</button>
            </div>
        </div>
        
    )
}
export default Pagination;