
//presentation component concerning with the looks and design
import React,{Component}  from 'react';
import { Card, CardImg,CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,Modal,ModalBody,ModalHeader,Button,Row,Col,Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components';

const required = (val) =>val && val.length;
const maxLength=(len)=>val=>!val||val.length<=len;
const minLength=(len)=>val=> val && val.length>=len;


function RenderDish({dish}) {
  if (dish != null) {
    return (
      <FadeTransform in
                tranformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
      </FadeTransform>
    );
  } 
}


    
   
    
function RenderComments({comments, postComment, dishId}){
 
  if(comments !=null){
  const commentList = comments.map((item)=>{ 
    return(
      <Stagger in>
        <Fade in>
          <li>
            
              {item.comment}
              <br/><br/>
              -- {item.author},  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}
              <br/><br/>
            
          </li>
        </Fade>
      </Stagger>
    );
  });
  return (
    <div className="col-12 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">
        {commentList}
      </ul>
        <CommentForm dishId={ dishId } postComment={postComment} />
      
       
    </div>
);
}
 
}

  

    
const DishDetail=(props) => {
  if(props.isLoading){
    return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
    );
  }
  else if(props.erMess){
    return(
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
  );

  }
  else if(props.dish !=null){
  return(
    <div className="container">
    <div className="row">
        <Breadcrumb>

            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
        </div>                
    </div>
    <div className="row">
        <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} 
            
            postComment={props.postComment}
            dishId={props.dish.id}
            />
            
            
        </div>
    </div>
    </div>
    
     
       
);
  
}
else{
  return(
    <div></div>
  );
}
}

class CommentForm extends Component{
  constructor(props){
    super(props);
    this.state={
      isModalOpen: false
    };
    this.toggleModal=this.toggleModal.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values){
    this.toggleModal();
    
    this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
  }

  render(){
    return(
      <React.Fragment>
     
         <Button outline onClick={this.toggleModal}>
            <span className="fa fa-edit fa-lg"></span>Submit Comment
          </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" id=".rating" name=".rating" className="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".name" name=".name" id=".name" className="form-control" placeholder="Author Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15)

                  }}/>
                  <Errors
                  className="text-danger"
                  model=".name"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be less than 15 characters"
                  }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
              <Label htmlFor="comment" md={12}>Comment</Label>
                <Col md={12}>
                  <Control.textarea model=".message" id="message" rows="6" className="form-control" name="message" />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" value="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
               
            


            </LocalForm>
          </ModalBody>
        </Modal>
      

   
      </React.Fragment>
    );
  }

}




 



export default DishDetail;



