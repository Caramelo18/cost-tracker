import React from 'react';
import './overview.css';

class Overview extends React.Component<any, any> {
    componentDidMount(){
        let url = "http://localhost:8080/transactions"
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({transactions: data});
        });
    }

    render() {
        let content;
        if (!this.state){
            content = <div>Loading</div>
        } else {
            content = 
            <div> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ipsum massa, aliquam vitae venenatis id, consectetur viverra erat. Praesent viverra, est eget tempus vestibulum, nisl elit interdum sem, a tempus nibh nulla volutpat ipsum. Sed tortor neque, tincidunt luctus interdum at, vehicula at velit. Nulla efficitur lectus ipsum, vel egestas turpis euismod eget. Cras diam massa, mattis ut nisi in, commodo vestibulum turpis. Morbi in metus hendrerit purus lobortis fringilla. Proin semper magna et lorem sagittis ultricies. Aenean nec dui laoreet, pharetra ipsum sed, imperdiet sapien. Maecenas sed rutrum dolor, id bibendum tortor. Maecenas vel congue tortor. Aliquam vitae varius sapien, ac commodo sapien. Aenean bibendum vulputate urna, sed sodales leo lacinia hendrerit. </div>
        }

        return (
            content
        )
    }

}

export default Overview;