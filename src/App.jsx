import React, {
    useRef,
    useState,
    useEffect,
} from "react"

import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ServiceWorkerBar from "./ServiceWorkerBar"
import html2canvas from "html2canvas"
import downloadPng from "./downloadPng"
import fonts from "./fonts"
function Sentence(props) {
    const {
        data,
        pgap,
        vertical,
        narrow  // width
    } = props
    return (<div>

            {
        narrow ? data.map((l)=>{
            return <p style={{margin:vertical?("0px "+pgap+"px 0px "+pgap+"px"):(pgap+"px 0px "+pgap+"px 0px")}}>{l}</p>
        }): <p style={{margin:vertical?("0px "+pgap+"px 0px "+pgap+"px"):(pgap+"px 0px "+pgap+"px 0px")}}>{data.join("\u3000")}
            </p>
        }
        </div>)
}
function App(props) {
    const [idx, setIdx] = useState(Math.floor(Math.random() * 300))
    const [data, setData] = useState([])
    const myRef = useRef()

    const [open, setOpen] = useState(false);
    const [open300, setOpen300] = useState(false);
    const [input, setInput] = useState(0);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [pgap, setPgap] = useState(10);

    const [color, setColor] = useState("#e0e0e0");
    const [backgroundColor1, setBackgroundColor1] = useState("#303030");
    const [backgroundColor2, setBackgroundColor2] = useState("#303030");
    const [linearGradient, setLinearGradient] = useState(false);

    const [textAlign, setTextAlign] = useState("center")
    const [vertical, setVertical] = useState(false)
    const [fontSize, setFontSize] = useState(36)
    
    const [narrow, setNarrow] = useState(true)

    const [font, setFont] = useState(0)


    const handlePgap = (e) => {
        setPgap(e.target.value)
    }

    const handleFontSize = (e) => {
        setFontSize(e.target.value)
    }
    const handleFont = (e) => {
        setFont(e.target.value)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClose300 = () => {
        setOpen300(false);
    };
    const handleOpen300 = () => {
        setOpen300(true);
    }
    const handleSelect = (e) => {
        setIdx(e.target.value)
        setInput(0)
        setOpen300(false)
    }


    const handleRandom = (e) => {
        var i = Math.floor(Math.random() * data.length)
        setIdx(i)
        setInput(0)
    }
    const handleWiki = (e) => {
        window.open(data[idx][0])
    }
    const handlePng = (e) => {
        html2canvas(myRef.current, {
            background: "linear-gradient(" + backgroundColor1 + "," + backgroundColor2 + ")"
        }).then(
            canvas => {
                downloadPng(canvas)
            }
        );
    }


    const handleColor = (e) => {
        setColor(e.target.value)
    }
    const handleBackgroundColor1 = (e) => {
        setBackgroundColor1(e.target.value)
        if (!linearGradient) setBackgroundColor2(e.target.value)
    }
    const handleBackgroundColor2 = (e) => {
        setBackgroundColor2(e.target.value)
    }
    const handleLinearGradient = (e) => {
        if (linearGradient) setBackgroundColor2(backgroundColor1)
        setLinearGradient(!linearGradient)
    }
   
    const handleInput = (e) => {
        setInput(1)
        setOpen(true)
    }
    const handleAuthor = (e) => {
        setAuthor(e.target.value)
    }
    const handleContent = (e) => {
        setContent(e.target.value)
    }
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleClear = (e) => {
        if (confirm("Clear Contents?")) {
            setContent("")
            setAuthor("")
            setTitle("")
        }
    }
    const handleVertical = (e) => {
        if (vertical) {
            setTextAlign("center")
        } else {
            setTextAlign("left")
        }
        setVertical(!vertical)
    }

    const handleTextAlign = (e) => {
        if (textAlign == "center") {
            setTextAlign("left")
        } else {
            setTextAlign("center")
        }
    }

    const handleNarrow = (e) => {
        setNarrow(!narrow)
    }



    useEffect(function() {
        fetch("./data/tang300.v4.json")
            .then((d) => (d.json()))
            .then(function(d) {
                setData(d)
            })
    }, [])

    return (
        <div style={{overflow:"auto"}}>
        <ServiceWorkerBar worker="/tuwen/sw.js" scope="/tuwen/" />
        <div style={{color:"#EEE",backgroundColor:"#333"}}>
        <div style={{textAlign:"center",paddingTop:"2px"}}>
        <Button onClick={handleInput} style={{color:"#EEE"}}>输入</Button>
        <Button onClick={handleOpen300} style={{color:"#EEE"}}>选诗</Button>
        <Button onClick={handleRandom} style={{color:"#EEE"}}>随机</Button>
        <span>|</span>
        {input==0?<Button onClick={handleWiki} style={{color:"#EEE"}}>维基</Button>:null}
        <Button onClick={handlePng} style={{color:"#EEE"}}>下载为图片</Button>
        <span>|</span>
        <Button onClick={handleVertical} style={{color:"#EEE"}}>{vertical?"竖":"横"}</Button>
        {input==0?<Button onClick={handleNarrow} style={{color:"#EEE"}}>{narrow?"窄":"宽"}</Button>:null}
        <Button onClick={handleTextAlign} style={{color:"#EEE"}}>{textAlign=="center"?"居中":"靠边"}</Button>
        
        <select onChange={handleFont} value={font}>
        {fonts.map((d,i)=>{
            return (<option value={i}>{d.c}</option>)
        })}
        </select>
        <input type="number" value={fontSize} onChange={handleFontSize} style={{width:"40px", paddingLeft:"2px"}}></input>
        <span>px</span>
        <span>|</span>
        <input type="color" value={color} onChange={handleColor} style={{width:"30px"}}></input>
        <input value={linearGradient} title="渐变" onChange={handleLinearGradient} type="checkbox"></input>
        <input type="color" value={backgroundColor1} onChange={handleBackgroundColor1} style={{width:"30px"}}></input>
        {linearGradient? <input type="color" value={backgroundColor2} onChange={handleBackgroundColor2} style={{width:"30px"}}></input> : null }
        <span>|</span>
        行距
        <input type="number" value={pgap} onChange={handlePgap} style={{width:"40px", paddingLeft:"2px"}}></input>
        <span>px</span>
        </div>    
        <div style={{overflow:"scroll",textAlign:textAlign, fontFamily: fonts[font].d, overflow:"auto", fontSize:fontSize+"px", padding:"50px 50px 50px 50px", color:color, background:"linear-gradient(" + backgroundColor1 + "," + backgroundColor2 +")"}} ref={myRef} class={vertical?"content vtext":"content"}>
        {
            data.length>0 && input==0?( <div>
            <div>{data[idx][1]}</div>
            <div style={{fontSize:Math.round(fontSize*2/3)+"px",color:color}}>
                {data[idx][2]}
            </div>
            <div style={{padding:"16px"}}></div>
            <div>
            {
            data[idx][3].map(function(d){
                var l = d.split(/['\uff0c','\uff1f','\u3002','\uff01','\uff1b']/)
                return <Sentence data={l} pgap={pgap} vertical={vertical} narrow={narrow}/>
            })
            }
            </div>
            </div>
            ):null
        }
        {
            input==1 ? (
            <div style={{paddingTop:"50px", paddingBottom:"50px"}}>
            <div>{title}</div>
            <div style={{fontSize:Math.round(fontSize*2/3)+"px",color:color}}>
               {author}
            </div>
            <div style={{padding:"16px"}}></div>
            <div>
                {content.split("\n").map((d)=>{
                    return <p style={{margin: vertical?("0px "+pgap+"px 0px "+pgap+"px"):(pgap+"px 0px "+pgap+"px 0px")}}>{d}</p>
                })}
            </div>
            </div>):null
        }
            </div>

        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">输入诗句</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="标题"
            fullWidth
            value={title}
            onChange={handleTitle}
          />
          <TextField
            margin="dense"
            id="author"
            label="作者"
            fullWidth
            value={author}
            onChange={handleAuthor}
          />
          <TextField
            margin="dense"
            id="content"
            label="内容"
            fullWidth
            multiline
            rows={10}
            value={content}
            onChange={handleContent}
          />
        </DialogContent>
        <DialogActions>
         <Button onClick={handleClear} color="secondary">
            Clear
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

       <Dialog open={open300} onClose={handleClose300} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
            <ul class="poetry-list">
            {
            data.map((d,i)=>{
                return (<li onClick={handleSelect} value={i}>{d[2]+"-"+ d[1]}</li>)
            })
            }
            </ul>
        </DialogContent>
      </Dialog>

    </div>)
}
export default App
