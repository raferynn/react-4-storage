import React from "react"
import $ from "jquery"
import "bootstrap/dist/js/bootstrap.bundle"
import ListBelanja from "../Components/ListBelanja"


class BelanjaKu extends React.Component{
    constructor(){
        super()
        this.state = {
            belanja: [
                {
                    id:"1", barang: "indomie", harga: "2000",jumlah: "1", total:"2000"
                },
                {
                    id:"2", barang: "sampo", harga: "15000",jumlah: "1", total:"2000"
                },
                {
                    id:"3", barang: "sabun", harga: "3000",jumlah: "1", total:"3000"
                }
            ],

            id: "",
            barang: "",
            harga:"",
            jumlah:"",
            total:"",
            action:"",
            selectedItem: null,
            keyword: "",
            filterBelaja: []
        }

        this.state.filterBelanja = this.state.belanja

    }

    Add = () => {
        $("#modal_belanja").modal("show")
        this.setState({
            id: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }


    Edit = (item) => {
        $("#modal_belanja").modal("show")
        this.setState({
            id:item.id,
            barang: item.barang,
            harga: item.harga,
            jumlah: item.jumlah,
            action:"update",
            selectedItem:item
        })
    }

    Save = (event) => {
        event.preventDefault();
        //menampung data state
        let tempBelanja = this.state.belanja

        let harga = this.state.harga
        let jumlah = this.state.jumlah
        let total = harga*jumlah

        if (this.state.action === "insert"){
            //menambah data baru
            tempBelanja.push({
                id: this.state.id,
                barang: this.state.barang,
                harga: this.state.harga,
                jumlah: this.state.jumlah,
                total:total
            })
        }else if(this.state.action === "update"){
            //menyimpan perubahan data
            let index = tempBelanja.indexOf(this.state.selectedItem)
            tempBelanja[index].barang = this.state.barang
            tempBelanja[index].harga = this.state.harga
            tempBelanja[index].jumlah = this.state.jumlah
            tempBelanja[index].total = total
        }

        this.setState({belanja : tempBelanja})

        //menutup komponen modal_belanja
        $("#modal_belanja").modal("hide")
    }

    Drop = (item) => {
        //beri konfirmasi untuk menghapus data
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            //menghapus data
            let tempBelanja = this.state.belanja
            //posisi index yang akan dihapus
            let index = tempBelanja.indexOf(item)

            //hapus data
            tempBelanja.splice(index,1)

            this.setState({belanja : tempBelanja})
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            //13 adalah kode untuk tombol enter

            let keyword = this.state.keyword.toLowerCase()
            let tempBelanja = this.state.belanja
            let result = tempBelanja.filter(item => {
                return item.barang.toLowerCase().includes(keyword) ||
                item.harga.toLowerCase().includes(keyword)
            })

            this.setState({filterBelanja: result})
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
                    { this.state.filterBelanja.map( (item, index) => (
                        <ListBelanja
                        barang={item.barang}
                        harga={item.harga}
                        jumlah={item.jumlah}
                        total={item.total}
                        onEdit={ () => this.Edit(item)}
                        onDrop={ () => this.Drop(item)}
                        />
                    )) }
                </div>

                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_belanja">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Menambah Data Belanja
                            </div>

                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Id
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.id}
                                    onChange={ ev => this.setState({id: ev.target.value}) }
                                    required />
                                    
                                    Nama Barang
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.barang}
                                    onChange={ ev => this.setState({barang: ev.target.value}) }
                                    required />
                                    
                                    Harga Barang
                                    <input type="text" className="form-control mb-2"
                                    value={this.state.harga}
                                    onChange={ ev => this.setState({harga: ev.target.value}) }
                                    required />
                                    
                                    Jumlah Barang
                                    <input type="number" className="form-control mb-2"
                                    value={this.state.jumlah}
                                    onChange={ ev => this.setState({jumlah: ev.target.value}) }
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

export default BelanjaKu;