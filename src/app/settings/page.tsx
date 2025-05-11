"use client";

import { PageSettings } from "@/components/pageSettings/PageSettings";
import { useAuth } from "@/utils/auth";

export default function Settings() {
    useAuth();

    return (
        <>
            <PageSettings />
        </>
    );
}