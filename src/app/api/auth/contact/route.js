import Contact from "@/models/Contact";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async(request) => {
    const {name,email,message} = await request.json();

    try {
        await connect();
        await Contact.create({name, email, message});
        return NextResponse.json({
        msg: "Message sent successfully", 
        success: true,
       }, {status: 300});
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
            let errorList = [];
            for(let e in error.errors){
                errorList.push(error.errors[e].message);
            }
            console.log(errorList);
            return NextResponse.json({msg: errorList, success: false}, {status: 422})
        }
        else {
            return NextResponse.json({ msg: "Unable to send message.", success: false }, { status: 520 });
        }
    }
}