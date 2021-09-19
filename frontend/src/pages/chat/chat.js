import {useEffect,useState} from 'react';
import io from 'socket.io-client';

let socket="";

function Chat() {

   var serverUrl="http://localhost:4000/";
  
    const [user,setuser]=useState('')
    const [room,setroom]=useState('')
    const [messages,setmesages]=useState([]);
    const [msg,setmsg]=useState('');


    useEffect(()=>{
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const name = params.get('name');
        const room = params.get('room');
        console.log("wwwwwwwwwwwwww",name,room);
        setuser(user);
        setroom(room);
        socket=io(serverUrl);

        socket.emit('join',{name:name,room:room},(error)=>{

            if(error){           

             }
        })
         return ()=>{
             socket.disconnect();
             socket.off();
         }
    },[]);

useEffect(()=>{

    socket.on('message',msg=>{

        console.log("msggggggggggggg",msg);

        setmesages(premsg=>
            
            [...premsg,msg]
        )

       // setmesages(msg);

    })
},[])

const sendMessage=(e)=>
{
    e.preventDefault();

    socket.emit('sendMsg',msg,()=>{
        setmsg("")
    })
}

  return (
    <div className="App">
        
        <ul>
            {
                messages&&messages.map((msg,idx)=>{

                    return(
                        <>
                        {
                            console.log("msgggggggggggggggg",msg)
                        }
                        <li key={idx}>{JSON.stringify(msg)}</li>
                        </>
                    )

                })
            }
        </ul>

        <input type="text"  
        value={msg}
        onKeyPress={(e)=>e.key=="Enter"?sendMessage(e):null}
        onChange={(e)=>setmsg(e.target.value)}
        />
    </div>
  );
}

export default Chat;
