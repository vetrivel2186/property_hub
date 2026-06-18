"use client";

import { useEffect, useState } from "react";

import {
    getReceivedInquiries,
} from "@/services/inquiryApi";
import { getPropertyById } from "@/services/propertyApi";
import { properties } from "@/data/properties";
import { Property } from "@/types/property";

export default function ReceivedInquiriesPage() {

    const [inquiries, setInquiries] =
        useState<any[]>([]);
    const [propeties, setproperties] = useState<Property>()

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const result =
            await getReceivedInquiries();

        setInquiries(
            result.data
        );
        getPropertyFunc(result.data.propertyId)
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
                Received Inquiries
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
                                From:
                                {" "}
                                {
                                    inquiry.name
                                }
                            </p>

                            <p>
                                Email:
                                {" "}
                                {
                                    inquiry.email
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