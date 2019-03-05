import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Loader } from "semantic-ui-react";

class HomePageForPractitioner extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.bool=true;
  }

  static defaultProps = {
    event: {
      start: "no appointment time",

    }
  };

  componentDidUpdate(prevProps) {
    const cProps=JSON.stringify(this.props);
    const pProps=JSON.stringify(prevProps);
    if(cProps!==pProps)
    {
      this.bool=false;
    }else{
      this.props.event.start="Invalid Date"
      this.bool=false;
    }
  }

  updateHomePage(){
     if(this.bool){
       return <Loader content='Loading' active inline='centered' size='large'/>;
     }else{
       return ( <div>
         <p>Hello {this.props.user.name}</p>
         {new Date(this.props.event.start).toLocaleString("en-uk") !==
         "Invalid Date" ? (
           <p>
             Here is the time for your patient {this.props.event.patient}'s next
             appointment:{" "}
             <Link to={"/secured/calendar"}>
               {new Date(this.props.event.start).toLocaleString("en-uk")}
             </Link>
           </p>
         ) : (
           <p>You dont't have any appointment</p>
         )}
       </div>)
     }
  }


  render() {
    return this.updateHomePage();
  }
}

export default HomePageForPractitioner;
