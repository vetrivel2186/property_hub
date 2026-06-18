"use client";

import { useEffect, useState } from "react";

import {
    getSentInquiries,
} from "@/services/inquiryApi";
import { getPropertyById } from "@/services/propertyApi";
import { Property } from "@/types/property";

export default function SentInquiriesPage() {

    const [inquiries, setInquiries] =
        useState<any[]>([]);
    const [properties, setproperties] = useState<Property>()

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const result =
            await getSentInquiries();
        console.log("result",result)
        setInquiries(
            result.data
        );
        // getPropertyFunc()
        
    };

    const getPropertyFunc = async (id: number) => {
        try {
            let result = await getPropertyById(id)
            console.log("result", result)
            setproperties(result?.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="max-w-6xl mx-auto py-10">

            <h1 className="text-3xl font-bold mb-8">
                Sent Inquiries
            </h1>

            <div className="space-y-4">

                {inquiries.map(
                    (inquiry) => (

                        <div
                            key={inquiry.id}
                            className="bg-white shadow rounded-xl p-5"
                        >

                            <h2 className="font-bold text-lg">
                                {
                                    // properties.title
                                }
                            </h2>

                            <p>
                                Owner:
                                {" "}
                                {
                                    inquiry
                                        .name
                                }
                            </p>

                            <p className="mt-3">
                                {
                                    inquiry.message
                                }
                            </p>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}