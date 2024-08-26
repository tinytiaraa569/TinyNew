// craete product

import axios from "axios"
import { server } from "../../server"



export const createProduct = (
    name,
    skuid,
    description,
    category,
    subcategory,
    tags,
    originalPrice,
    discountPrice,
    stock,
    designno,
    shopId,
    images,
    withchainimages,
    withchainoutimages,
    YellowGoldclr,
    RoseGoldclr,
    WhiteGoldclr,
    YellowGoldclrStock,
    RoseGoldclrStock,
    WhiteGoldclrStock,
    goldWeight,
    diamondWeight,
    dimension,
    // height,
    // width,
    enamelColors,

    //wnamel stocks

    deepblueYellowGoldclrStock,
    deepblueRoseGoldclrStock,
    deepblueWhiteGoldclrStock,

    pinkYellowGoldclrStock,
    pinkRoseGoldclrStock,
    pinkWhiteGoldclrStock,


    turquoiseYellowGoldclrStock,
    turquoiseRoseGoldclrStock,
    turquoiseWhiteGoldclrStock,

    redYellowGoldclrStock,
    redRoseGoldclrStock,
    redWhiteGoldclrStock,

    blackYellowGoldclrStock,
    blackRoseGoldclrStock,
    blackWhiteGoldclrStock,

    deepgreenYellowGoldclrStock,
    deepgreenRoseGoldclrStock,
    deepgreenWhiteGoldclrStock,

    lotusgreenYellowGoldclrStock,
    lotusgreenRoseGoldclrStock,
    lotusgreenWhiteGoldclrStock,
    // enamelColorImages

    gender,
    ageGroup

) => async (dispatch) => {
    try {
        dispatch({
            type: "productCreateRequest"
        })

        const config = { headers: { "Content-Type": "multipart/form-data" } }


        const { data } = await axios.post(
            `${server}/product/create-product`,
            name,
            skuid,
            description,
            category,
            subcategory,
            tags,
            originalPrice,
            discountPrice,
            stock,
            designno,
            shopId,
            images,
            withchainimages,
            withchainoutimages,
            YellowGoldclr,
            RoseGoldclr,
            WhiteGoldclr,
            goldWeight,
            diamondWeight,
            dimension,
            // height,
            // width,
            enamelColors,
            YellowGoldclrStock,
            RoseGoldclrStock,
            WhiteGoldclrStock,
            // enamelColorImages,

            deepblueYellowGoldclrStock,
            deepblueRoseGoldclrStock,
            deepblueWhiteGoldclrStock,

            //pinkenamel
            pinkYellowGoldclrStock,
            pinkRoseGoldclrStock,
            pinkWhiteGoldclrStock,


            turquoiseYellowGoldclrStock,
            turquoiseRoseGoldclrStock,
            turquoiseWhiteGoldclrStock,

            redYellowGoldclrStock,
            redRoseGoldclrStock,
            redWhiteGoldclrStock,

            blackYellowGoldclrStock,
            blackRoseGoldclrStock,
            blackWhiteGoldclrStock,

            deepgreenYellowGoldclrStock,
            deepgreenRoseGoldclrStock,
            deepgreenWhiteGoldclrStock,

            lotusgreenYellowGoldclrStock,
            lotusgreenRoseGoldclrStock,
            lotusgreenWhiteGoldclrStock,
            gender,
            ageGroup,
            config
        )


        dispatch({
            type: "productCreateSuccess",
            payload: data.product
        })

    } catch (error) {

        dispatch({
            type: "productCreateFail",
            payload: error.response.data.message
        })

    }
}


// get All Products of a shop

export const getAllProductShop = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsShopRequest"
        })



        const { data } = await axios.get(
            `${server}/product/get-all-products-shop/${id}`,
        )

        dispatch({
            type: "getAllProductsShopSuccess",
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: "getAllProductsShopFailed",
            payload: error.response.data.message
        })

    }
}


//delete  products 

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductRequest"
        })



        const { data } = await axios.delete(
            `${server}/product/delete-shop-product/${id}`, { withCredentials: true }
        )

        dispatch({
            type: "deleteProductSuccess",
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: "deleteProductFailed",
            payload: error.response.data.message
        })

    }
}

// get all products
export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsRequest",
        });

        const { data } = await axios.get(`${server}/product/get-all-products`);
        dispatch({
            type: "getAllProductsSuccess",
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: "getAllProductsFailed",
            payload: error.response.data.message,
        });
    }
};



export const updateProduct = (
    id, // Product ID to update
    name,
    skuid,
    description,
    category,
    subcategory,
    tags,
    originalPrice,
    discountPrice,
    stock,
    designno,
    shopId,
    images,
    withchainimages,
    withchainoutimages,
    YellowGoldclr,
    RoseGoldclr,
    WhiteGoldclr,
    YellowGoldclrStock,
    RoseGoldclrStock,
    WhiteGoldclrStock,
    goldWeight,
    diamondWeight,
    dimension,
    enamelColors,
    deepblueYellowGoldclrStock,
    deepblueRoseGoldclrStock,
    deepblueWhiteGoldclrStock,
    pinkYellowGoldclrStock,
    pinkRoseGoldclrStock,
    pinkWhiteGoldclrStock,
    turquoiseYellowGoldclrStock,
    turquoiseRoseGoldclrStock,
    turquoiseWhiteGoldclrStock,
    redYellowGoldclrStock,
    redRoseGoldclrStock,
    redWhiteGoldclrStock,
    blackYellowGoldclrStock,
    blackRoseGoldclrStock,
    blackWhiteGoldclrStock,
    deepgreenYellowGoldclrStock,
    deepgreenRoseGoldclrStock,
    deepgreenWhiteGoldclrStock,
    lotusgreenYellowGoldclrStock,
    lotusgreenRoseGoldclrStock,
    lotusgreenWhiteGoldclrStock,
    gender,
    ageGroup
) => async (dispatch) => {
    try {
        dispatch({ type: "productUpdateRequest" });

        // Construct FormData object
        const formData = new FormData();
        formData.append("name", name);
        formData.append("skuid", skuid);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("subcategory", subcategory);
        formData.append("tags", tags);
        formData.append("originalPrice", originalPrice);
        formData.append("discountPrice", discountPrice);
        formData.append("stock", stock);
        formData.append("designno", designno);
        formData.append("shopId", shopId);
        formData.append("images", images);
        formData.append("withchainimages", withchainimages);
        formData.append("withchainoutimages", withchainoutimages);
        formData.append("YellowGoldclr", YellowGoldclr);
        formData.append("RoseGoldclr", RoseGoldclr);
        formData.append("WhiteGoldclr", WhiteGoldclr);
        formData.append("YellowGoldclrStock", YellowGoldclrStock);
        formData.append("RoseGoldclrStock", RoseGoldclrStock);
        formData.append("WhiteGoldclrStock", WhiteGoldclrStock);
        formData.append("goldWeight", goldWeight);
        formData.append("diamondWeight", diamondWeight);
        formData.append("dimension", dimension);
        formData.append("enamelColors", JSON.stringify(enamelColors)); // Convert object to JSON string
        formData.append("deepblueYellowGoldclrStock", deepblueYellowGoldclrStock);
        formData.append("deepblueRoseGoldclrStock", deepblueRoseGoldclrStock);
        formData.append("deepblueWhiteGoldclrStock", deepblueWhiteGoldclrStock);
        formData.append("pinkYellowGoldclrStock", pinkYellowGoldclrStock);
        formData.append("pinkRoseGoldclrStock", pinkRoseGoldclrStock);
        formData.append("pinkWhiteGoldclrStock", pinkWhiteGoldclrStock);
        formData.append("turquoiseYellowGoldclrStock", turquoiseYellowGoldclrStock);
        formData.append("turquoiseRoseGoldclrStock", turquoiseRoseGoldclrStock);
        formData.append("turquoiseWhiteGoldclrStock", turquoiseWhiteGoldclrStock);
        formData.append("redYellowGoldclrStock", redYellowGoldclrStock);
        formData.append("redRoseGoldclrStock", redRoseGoldclrStock);
        formData.append("redWhiteGoldclrStock", redWhiteGoldclrStock);
        formData.append("blackYellowGoldclrStock", blackYellowGoldclrStock);
        formData.append("blackRoseGoldclrStock", blackRoseGoldclrStock);
        formData.append("blackWhiteGoldclrStock", blackWhiteGoldclrStock);
        formData.append("deepgreenYellowGoldclrStock", deepgreenYellowGoldclrStock);
        formData.append("deepgreenRoseGoldclrStock", deepgreenRoseGoldclrStock);
        formData.append("deepgreenWhiteGoldclrStock", deepgreenWhiteGoldclrStock);
        formData.append("lotusgreenYellowGoldclrStock", lotusgreenYellowGoldclrStock);
        formData.append("lotusgreenRoseGoldclrStock", lotusgreenRoseGoldclrStock);
        formData.append("lotusgreenWhiteGoldclrStock", lotusgreenWhiteGoldclrStock);
        formData.append("gender", gender);
        formData.append("ageGroup", ageGroup);

        // Send the request
        const { data } = await axios.put(
            `${server}/product/update-product/66c86dd4b30f1c38ba6f85fb`, // Endpoint to update the product
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        dispatch({
            type: "productUpdateSuccess",
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: "productUpdateFail",
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
