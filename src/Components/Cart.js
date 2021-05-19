import React from "react"
import CartContainer from './CartContainer'

class Cart extends React.Component{
    constructor(){
        super()
        this.state = {
            cart: [], // untuk menyimpan list cart
            user: "", // untuk menyimpan data nama user
            total: 0, //untuk menyimpan data total belanja
        }
    }

    initCart = () => {
        // memanggi data cart pada local storage
        let tempCart = JSON.parse(localStorage.getItem("cart"))

        //memanggil data user pada local storage
        let userName = localStorage.getItem("user")

        //kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga * item.jumlahBeli)
        })

        //memasukkan data cart, user dan total harga pada state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }

    componentDidMount(){
        this.initCart()
    }

    Add = (item) => {
        let tempCart = this.state.cart
        let index = tempCart.indexOf(item)

        tempCart[index].jumlahBeli = parseInt(item.jumlahBeli) + 1

        this.setState({ cart: tempCart })

        let stringcart = JSON.stringify(this.state.cart)

        localStorage.setItem("cart", stringcart)
    }

    
    Substract = (item) => {
        let tempCart = this.state.cart
        let index = tempCart.indexOf(item)

        if (item.jumlahBeli <= 1) {
            if (window.confirm("are you sure?")) {
                tempCart.splice(index, 1)
                this.setState({ cart: tempCart })
            } else {
                this.setState({ cart: tempCart })
            }
        } else {
            tempCart[index].jumlahBeli = parseInt(item.jumlahBeli) - 1
            this.setState({ cart: tempCart })
        }


        let stringcart = JSON.stringify(this.state.cart)
        localStorage.setItem("cart", stringcart)
    }

    render(){
        return(
            <div className="container">
                {this.state.cart.map((item, index) => (
                    <CartContainer
                        cover={item.cover}
                        judul={item.judul}
                        harga={item.harga}
                        jumlah={item.jumlahBeli}
                        add={() => this.Add(item)}
                        substract={() => this.Substract(item)}
                        total={item.harga * item.jumlahBeli}
                    />
                ))}

                <div className="container">
                    <div className="text-danger">
                        <br></br>
                        <h3 className="fw-bold text-center">
                            TOTAL HARGA   Rp {this.state.total}
                        </h3>
                    </div>
                </div>

            </div>
        )
    }
}

export default Cart;