import React from 'react'

export default class CartContainer extends React.Component {
    render() {
        return (
            <div className="col-lg-4 col-sm-12 p-2">
                <div className="card p-2 border-secondary">
                    <div className="row">
                        <div className="col-4">
                            <img src={this.props.cover} className="img" height="150" />
                        </div>
                       
                        <div className="col-8">
                            <h4 className="text-primary">{this.props.judul}</h4>
                            <h6>Harga : Rp {this.props.harga}</h6>

                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                <button type="button" className="btn btn-success" onClick={this.props.substract}>-</button>
                                <div className="btn btn-secondary">{this.props.jumlah}</div>
                                <button type="button" className="btn btn-success" onClick={this.props.add}>+</button>
                            </div>
                    
                            <h6>Total : Rp {this.props.total}</h6>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}
