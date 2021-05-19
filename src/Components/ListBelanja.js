import React, { Component } from 'react'

class ListBelanja extends Component {
    render() {
        return (
                <div className="card m-2">
                    <div className="card-body">
                        <h5 className="card-header bg-success text-white">
                            {this.props.barang}
                        </h5>
                        <h6 className="card-body bg-secondary text-white">
                            Harga : {this.props.harga} <br></br>
                            Jumlah : {this.props.jumlah}
                        </h6>
                        <h5 className="card-footer bg-warning text-white">
                            Total : {this.props.total}
                        </h5>
                    </div>
                    
                    {/* button untuk mengedit */} 
                    <button className="btn btn-sm btn-primary m-1"
                        onClick={this.props.onEdit}>
                                Edit
                    </button>

                    {/* button untuk mengapus */} 
                    <button className="btn btn-sm btn-danger m-1"
                        onClick={this.props.onDrop}>
                                Hapus
                    </button>
                </div>
        )
    }
}

export default ListBelanja;