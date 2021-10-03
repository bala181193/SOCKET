import { useState, useEffect } from 'react';
import axios from 'axios';
import { mulipleCheckbox, getMultiboxData } from '../../action/action'
const values = {
  cricket: false,
  football: false,
  kabadi: false
}
const courseData = [{ name: "php", isChecked: false }, { name: "java", isChecked: false }, { name: "react", isChecked: false }]
const url = "http://localhost:4000"
const CheckBox = () => {


  const [sports, setsports] = useState(values);
  const [course, setcourse] = useState([])

  useEffect(() => {

    getMultipleCheckboxData()
  }, [])

  const getMultipleCheckboxData = async () => {

    const { status, result } = await getMultiboxData();
    console.log("aaaaaaaaaaaaaaaaaaaaaaa",result)
    setcourse(result);
  }
  const handleChange = (e) => {

    var { name, checked } = e.target;
    const formData = { ...sports, ...{ [name]: checked } }

    setsports(formData)

  }

  const check_array_change = (e) => {

    const { name, checked } = e.target

    if (name == "all_select") {
      const tempData = course.map(course => { return { ...course, isChecked: checked } })
      setcourse(tempData)
    }
    else {
      const tempData = course.map(course => course.name == name ? { ...course, isChecked: checked } : course)
      setcourse(tempData)
    }

  }


  const onSubmit = async (e) => {
    e.preventDefault();

    const saveData = await axios.post(`${url}/user/checkBox`, sports)

  }

  const mulipleCheckboxSubmit = async (e) => {

    e.preventDefault();
    const { status, errors, message } = await mulipleCheckbox(course);
    if(status=="success")
    {
      setTimeout(()=>{
        getMultipleCheckboxData();

      },1000)
    }
  }
  return (
    <div className="container">

      <h2>Save the multiple checkbox values in React js</h2>



      {/* {next form } */}

      <form onSubmit={onSubmit}>
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

      <form onSubmit={mulipleCheckboxSubmit}>

        <div className="form-check">
          <input type="checkbox"
            name="all_select"
            checked={course.filter(course => {
              return course.isChecked != true
            }
            ).length < 1}
            onChange={check_array_change}
            className="form-check-input"
          />
          <label className="form-check-label">
            All Seletct
          </label>
        </div>

        <div className="form-check">
          {
            course && course.map((data, i) => {

              return (
                <>
                  <input type="checkbox"
                    name={data.name}
                    checked={data?.isChecked || false}
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