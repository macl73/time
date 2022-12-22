import React, {useState} from 'react';


export function DateTimePretty(Component) {
  return class extends React.Component {
    constructor(props) {
        super(props)
        this.date = this.props.date
        this.state = {
            date: this.props.date
        }
    }

    timeAgo() {
        const now = new Date()
        const uploadTime = new Date(this.date)
        const diff = (now - uploadTime)
        if (diff > (365*24*60*60000)) {
            return Math.floor(diff/(365*24*60*60000)) + " лет назад"
          } else if (diff > (30*24*60*60000)) {
            return Math.floor(diff/(30*24*60*60000)) + " месяцев назад"
          } else if (diff > (24*60*60000)) {
            return Math.floor(diff/(24*60*60000)) + " дней назад"
          } else if (diff > (60*60000)) {
            return Math.floor(diff/(60*60000))  + " часов назад"
          } else if (diff > 60000) {
            return Math.floor(diff/60000) + " минут назад"
          } else if (diff > 1000) {
            return Math.floor(diff/1000) + " секунд назад"
          }
    }

    componentDidMount() {
        const newOutput = this.timeAgo()
        this.setState({date: newOutput})
    }

    render() {
        return <Component date={this.state.date} />
    }
  }
}

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

const PrettierTime = DateTimePretty(DateTime)

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <PrettierTime date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} key={item.url} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);
    
    return (
        <VideoList list={list} />
    );
}