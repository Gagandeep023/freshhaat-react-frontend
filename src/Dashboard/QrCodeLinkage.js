import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import UploadFileInBucket from "../digitalOcean/UploadFileInBucket";
import useAxiosFetch from "../hooks/useAxiosFetch";
import UseAxiosFetch from "../hooks/useAxiosFetch";
import useHandleImageChange from "../hooks/useHandleImageChange";

const QrCodeLinkage =  () => {
const [postQrCodeId, setPostQrCodeId] = useState('');
const [postProductId, setPostProductId] = useState('');
const [productList, setProductList] = useState([])
const [productQrCodeList, setProductQrCodeList] = useState([])
const [newQrCodeURL, setNewQrCodeURL] = useState('');
const [isGenerateVisible, setIsGenerateVisible] = useState(true);
const [isQrUplaodVisible, setQrUplaodVisible] = useState(true);
const [postQrCodeImage, setPostQrCodeImage] = useState('');
const [updateText, setUpdateText] = useState('');
const [changeQrLinkageText, setChangeQrLinkageText] = useState('');
const [isChangeQrLinkageVisible, setChangeQrLinkageVisible] = useState(true);
const [updateImage, setUpdateImage] = useState('');



const { data: productListData } = useAxiosFetch('/api/v1/dashboard/product-list');

let productListDataValue;
if(productListData && productListData.productList){
    productListDataValue = productListData
}
useEffect(() => {
    if(productListDataValue)
        setProductList(productListDataValue.productList);
}, [productListDataValue] )

const { data: productQrCodeListData } = useAxiosFetch('/api/v1/dashboard/product-qr-code-list');

let productQrCodeListDataValue;
if(productQrCodeListData && productQrCodeListData.qrCodeList){
    productQrCodeListDataValue = productQrCodeListData
}
useEffect(() => {
    if(productQrCodeListDataValue)
        setProductQrCodeList(productQrCodeListDataValue.qrCodeList);
}, [productQrCodeListDataValue] )

const CreateNewQrCodeLink = async (e) => {
    e.preventDefault();
    try {
        const response =  await axiosPrivate.get('/api/v1/dashboard/create-qr-code-linkage');
        const QrCodeURL = `http://localhost:3000/dashboard/product-information?productInfoId=${response.data.qrLinkageId}`
        setNewQrCodeURL(QrCodeURL);
        setIsGenerateVisible(current => !current);

    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

const ChangeQrCodeImage = async (e) => {
    e.preventDefault();
    
    try {
        if(updateImage && updateImage[0] ){
            const NewQrCodeImage = { qr_id: postQrCodeId, qr_image: updateImage[0].name, qr_image_details: updateImage[0] };
        const response =  await axiosPrivate.post('/api/v1/dashboard/change-qr-code-image', NewQrCodeImage );
        if(response) {
            setQrUplaodVisible(current => !current);
            setUpdateText(response.data.msg)
        }
        setPostQrCodeImage('');
        setPostQrCodeId('');
    } else {
        console.log("please select file")
    }
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

const ChangeQrCodeLinkage = async (e) => {
    e.preventDefault();
    const NewQrCodeImage = { qr_id: postQrCodeId, product_id: postProductId, qr_image: postQrCodeImage.name };
    try {
        
        const response =  await axiosPrivate.post('/api/v1/dashboard/change-qr-code-linkage', NewQrCodeImage );
        if(response) {
            setChangeQrLinkageVisible(current => !current);
            setChangeQrLinkageText(response.data.msg)
        }
        setPostQrCodeImage('');
        setPostQrCodeId('');
        setPostProductId('');

    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}
    return (
        <main className="NewPost">

            <div style={{visibility: isGenerateVisible ? 'visible' : 'hidden'}}>
                <label htmlFor="postProductId">Create New Qr Code Link</label>
                <br/>
                    <button onClick={CreateNewQrCodeLink}>Generate</button>
            </div>
            <div style={{visibility: isGenerateVisible ? 'hidden' : 'visible'}}>
                <label htmlFor="postProductId">{newQrCodeURL}</label>
            </div>
            <div style={{visibility: isQrUplaodVisible ? 'visible' : 'hidden'}}>
                <form >
                <label htmlFor="postProductId">Add a new qr code</label>
                    {/* <input type="file" id="myFile" name="filename"
                        onChange={(e) => setPostQrCodeImage(e.target.files[0])}
                    />
                    <br/> */}
                    <input type="file" id="inputfile" accept="image/*"
            // onChange={UploadFileInBucket} 
            onChange={(e) => setUpdateImage(e.target.files)}
            />
                <select 
                id="postQrCodeId"
                value={postQrCodeId}
                onChange={(e) => setPostQrCodeId(e.target.value)}
                required>
                    <option >
                        Choose QrCode
                    </option>
                    {
                     productQrCodeList.map((item, index) => (
                    <option key={index} value={item.qr_id}>
                        {item.qr_name}
                    </option>
                    ))}
                </select>
                <br/>
                <button onClick={ChangeQrCodeImage}  type="submit">Submit</button>
                </form>
            </div>
            <div style={{visibility: isQrUplaodVisible ? 'hidden' : 'visible'}}>
                <label htmlFor="postProductId">{updateText}</label>
            </div>
            
            <div style={{visibility: isChangeQrLinkageVisible ? 'visible' : 'hidden'}}>

            <form className="newPostForm">
                <label htmlFor="postQrCodeId">Product:</label>
                <select 
                id="postQrCodeId"
                value={postQrCodeId}
                onChange={(e) => setPostQrCodeId(e.target.value)}
                required>
                    <option >
                        Choose QrCode
                    </option>
                    {
                     productQrCodeList.map((item, index) => (
                    <option key={index} value={item.qr_id}>
                        {item.qr_name}
                    </option>
                    ))}
                </select>
                <select 
                id="postproductId"
                value={postProductId}
                onChange={(e) => setPostProductId(e.target.value)}
                required>
                    <option >
                        Choose Product
                    </option>
                    {
                     productList.map((item, index) => (
                    <option key={index} value={item.product_id}>
                        {item.product_name}
                    </option>
                    ))}
                </select>
                <button onClick={ChangeQrCodeLinkage}  type="submit">Submit</button>


                </form>
                </div>

                <div style={{visibility: isChangeQrLinkageVisible ? 'hidden' : 'visible'}}>
                <label htmlFor="postProductId">{changeQrLinkageText}</label>
            </div>
        </main>
    )
}

export default QrCodeLinkage;