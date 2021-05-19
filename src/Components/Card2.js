import React from "react"

class Card2 extends React.Component{
    render(){
        return (
            <div className="col-lg-6 col-sm-12 p-2">
                <div>
                    {/* Menampilkan judul dan tanggal*/} 
                    <div className="card col-7 p-3">
                        <h5 className="card-header bg-success text-white">
                            {this.props.judul}
                        </h5>
                        <h6 className="card-body bg-secondary text-white">
                            Tanggal : {this.props.tanggal}
                        </h6>

                        {/* button untuk mengedit */} 
                        <button className="btn btn-sm btn-warning m-1"
                        onClick={this.props.onEdit}>
                            Edit
                        </button>

                        {/* button untuk mengapus */} 
                        <button className="btn btn-sm btn-danger m-1"
                        onClick={this.props.onDrop}>
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card2;