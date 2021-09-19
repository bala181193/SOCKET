import {useState,useEffect} from 'react';
import axios from 'axios';

const values={
    cricket:false,
    football:false,
    kabadi:false
}
const courseData=[{name:"php"},{name:"java"},{name:"react"}]
const url="http://localhost:4000"
const CheckBox=()=>{

   
    const [sports,setsports]=useState(values);
    const [course,setcourse]=useState([])

    useEffect(()=>{

      setcourse(courseData)
    },[])


      const handleChange=(e)=>{

        var{name,checked}=e.target;
        const formData={...sports,...{[name]:checked}}

        setsports(formData)


    }

    const check_array_change=(e)=>{

      const {name,checked}=e.target

      if(name=="all_select")
      {
        const tempData=course.map(course=>{return{...course,isChecked:checked}} )
        setcourse(tempData)
      }
      else{
        const tempData=course.map(course=>course.name==name?{...course,isChecked:checked}:course )
        setcourse(tempData)
      }
      
    }


  const     onSubmit =async (e) => {
        e.preventDefault();

        console.log("sportssssss",sports);
        console.log("mmmmmmmmmmmmmmmmmmmm",course)
      
    // const saveData=await axios.post(`${url}/user/checkBox`,data)
    let respData = await axios({
        'method': 'post',
        'url': `${url}/user/checkBox`,
      
        data: course
    });

      }

    return(
        <div className="container">
          
        <h2>Save the multiple checkbox values in React js</h2>
      
       

{/* {next form } */}

        <form onSubmit = {onSubmit}>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
              name="football"
              checked={sports.football}
              onChange={handleChange}
                className="form-check-input"
              />
              football 
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
              name="cricket"
              checked={sports.cricket}
              onChange={handleChange}
                className="form-check-input"
              />
              cricket
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
              name="kabadi"
              checked={sports.kabadi}
              onChange={handleChange}
                className="form-check-input"
              />
              kabadi
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>



        {/* {multible check box} */}

        <form onSubmit = {onSubmit}>

        <div className="form-check">
        <input type="checkbox"
              name="all_select"
              checked={course.filter(course=>
                {
                  return course.isChecked!=true
                }
                ).length<1}
              onChange={check_array_change}
                className="form-check-input"
              />
            <label className="form-check-label">              
            All Seletct
            </label>
          </div>

          <div className="form-check">
            {
                course&&course.map((data,i)=>{

                  return(
                    <>
             <input type="checkbox"
              name={data.name}
              checked={data?.isChecked||false}
              onChange={check_array_change}
                className="form-check-input"
              />
          <label className="form-check-label">  

             {data.name}
                      
                      </label>
                    </>
                  )

                })
            }
          
             
          </div>
         
          <div className="form-group">
            <button className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

      </div>
    )

}


export default CheckBox