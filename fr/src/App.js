import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [groups, setGroups] = useState(null)
  const [rasp, setRasp] = useState(null)

  const [week, setWeek] = useState(1)

  const fetchWeek = async () => {
    const response = await axios.get("http://localhost:3001/getWeek")
    console.log(response.data[0].week)
    setWeek(response.data[0].week)
  };

  const fetchGroups = async () => {
    const response = await axios.get("http://localhost:3001/getGroups")
    // console.log(response.data)
    setGroups(response.data)
  };

  useEffect(() =>{
    fetchGroups();
    fetchWeek();
  }, [])

  useEffect(() => {
    console.log('rasp updated:', rasp);
  }, [rasp]);

  const SelectGroup = async (btn_name) => {
    const response = await axios.get("http://localhost:3001/getData/" + btn_name)
    console.log(response.data)
    setRasp(response.data[0].rasp);
  }

  return (
    <>
      <div id="disclymer">
        <p>
        <b>Дисклеймер</b>
        <br />
        Уважаемые пользователи,
        <br />
        Пожалуйста, обратите внимание, что разработчик данного сайта не несет ответственности за точность или полноту информации, размещенной на сайте. Вся информация предоставляется исключительно пользователями, и мы не можем гарантировать ее достоверность или актуальность.
        <br />
        Использование материалов сайта осуществляется на ваш собственный риск. Мы настоятельно рекомендуем вам проверять всю информацию самостоятельно и полагаться на собственное суждение при принятии решений. Администрация сайта не несет ответственности за любые убытки или ущерб, которые могут возникнуть в результате использования представленной информации.
        <br />
        Спасибо за понимание.
        </p>
      </div>
      <div id="display">
        <div className="groups_arr">
          {groups ? groups.map((item, i) => {
            return (
              <div  key={i}>
                <button  onClick={() => SelectGroup(item.name)}>{item.name}</button>
              </div>
            )}) : <p>Loading...</p>
          }
        </div>
        {rasp && (
                <table className='rasp-table'>
                <thead>
                  <tr>
                    <th>Столбец №</th>
                    <th>Предмет</th>
                    <th>Преподаватели</th>
                    <th>Кабинет</th>
                  </tr>
                </thead>
                  {rasp.map((item, index) => (
                    <tbody key={index} className='rasp-day'>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.one_week && item.one_week.name === "" ? '\u00A0' : item.one_week.name || ""}</td>
                        <td>{item.one_week && item.one_week.prep === "" ? '\u00A0' : item.one_week.prep || ""}</td>
                        <td>{item.one_week && item.one_week.kab === "" ? '\u00A0' : item.one_week.kab || ""}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>{item.two_week && item.two_week.name === "" ? '\u00A0' : item.two_week.name || ""}</td>
                        <td>{item.two_week && item.two_week.prep === "" ? '\u00A0' : item.two_week.prep || ""}</td>
                        <td>{item.two_week && item.two_week.kab === "" ? '\u00A0' : item.two_week.kab || ""}</td>
                      </tr>
                      </tbody>
                  ))}
              </table>
        )}
        <p>Номер недели: {week}</p>
      </div>
    </>
  )
}

export default App
