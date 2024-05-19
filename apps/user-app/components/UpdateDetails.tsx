"use client"
import { TextInput } from "@repo/ui/TextInput";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { updateEmail } from "../lib/actions/updateUserDetails";
import { Button } from "@repo/ui/button";

export const UpdateDetails = ()=>{
    const [emailText, setEmailText] = useState("");
    const [nameText, setNameText] = useState("")

    return <div className="my-3">
        <Card title="Update Account Details">
            <div className="py-2">
                <div className="py-2">
                    <TextInput placeholder="xxxx@email.com" label="Update Email (Optional)" onChange={(value: string) => {
                        setEmailText(value.toLowerCase())
                    }} />
                </div>
                <div className="py-2">
                    <TextInput placeholder="Account holders's Name" label="Update name (Optional)" onChange={(value: string) => {
                        setNameText(value.toLowerCase())
                    }} />
                </div>
                <div className="py-2">
                    <Button children="Update details" onClick={async ()=> await updateEmail(emailText, nameText)} />
                </div>
            </div>
        </Card>
    </div>
}