
import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
    publicKey: "public_w3IZIaX1dTh4qKg+tymOqYsb4N8=",
    privateKey: "private_V2w3+iGN5qderjPtuRLXmmt7aX0=",
    urlEndpoint: "https://ik.imagekit.io/gdal96mht",
});

export async function GET(request: Request) {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters);
    } catch (error) {
        console.error("Error getting ImageKit authentication parameters:", error);
        return new NextResponse("Server configuration error.", { status: 500 });
    }
}
