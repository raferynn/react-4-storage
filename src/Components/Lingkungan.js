import React from "react"
import Card2 from "../Components/Card2"
import $ from "jquery"
import "bootstrap/dist/js/bootstrap.bundle"
class Lingkungan extends React.Component{
    constructor(){
        super()
        this.state = {
            hari: [
                {
                    judul: "Hari Peringatan Laut dan Samudera", 
                    tanggal:"15 Januari"
                },
                {
                    judul: "Hari Hutan Sedunia", 
                    tanggal:"21 Maret"
                },
                {
                    judul: "Hari Bumi", 
                    tanggal:"22 April"
                },
                {
                    judul: "Hari Pohon", 
                    tanggal:"21 November"
                }
            ],

            action: "",
            judul: "",
            tanggal:"",
            selectedItem: null,
            keyword: "",
            filterHari: []
        }

        this.state.filterHari = this.state.hari
    }

    Add = () => {
        // menampilkan komponen modal
        $("#modal_hari").modal("show")
        this.setState({
            judul: "",
            tanggal:"",
            action: "insert"
        })
    }


    Edit = (item) => {
        //menampilkan komponen modal
        $("#modal_hari").modal("show")
        this.setState({
            judul: item.judul,
            tanggal: item.tanggal,
            action: "update",
            selectedItem: item
        })
    }

    Save = (event) => {
        event.preventDefault();
        //menampung data state
        let tempHari = this.state.hari

        if (this.state.action === "insert"){
            //menambah data baru
            tempHari.push({
                judul: this.state.judul,
                tanggal: this.state.tanggal

            })
        }else if(this.state.action === "update"){
            //menyimpan perubahan data
            let index = tempHari.indexOf(this.state.selectedItem)
            tempHari[index].judul = this.state.judul
            tempHari[index].tanggal = this.state.tanggal
        }

        this.setState({hari : tempHari})

        //menutup komponen modal_buku
        $("#modal_hari").modal("hide")
    }

    Drop = (item) => {
        //beri konfirmasi untuk menghapus data
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            //menghapus data
            let tempHari = this.state.hari
            //posisi index yang akan dihapus
            let index = tempHari.indexOf(item)

            //hapus data
            tempHari.splice(index,1)

            this.setState({hari : tempHari})
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            //13 adalah kode untuk tombol enter

            let keyword = this.state.keyword.toLowerCase()
            let tempHari = this.state.hari
            let result = tempHari.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                item.tanggal.toLowerCase().includes(keyword) 
            })

            this.setState({filterHari: result})
        }
    }

    render(){
        return(
            <div className="container">
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                value={this.state.keyword}
                onChange={ev => this.setState({keyword : ev.target.value})}
                onKeyUp={ev => this.searching(ev)}/>
                <div className="row">
                    { this.state.filterHari.map( (item, index) => (
                        <Card2
                        judul={item.judul}
                        tanggal={item.tanggal}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                        />
                    )) }
                </div>

                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_hari">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Tanggalan
                            </div>

                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Peringatan
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.judul}
                                    onChange={ ev => this.setState({judul: ev.target.value}) }
                                    required />
                                    
                                    Tanggal Peringatan
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.tanggal}
                                    onChange={ ev => this.setState({tanggal: ev.target.value}) }
                                    required />

                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Lingkungan;