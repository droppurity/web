
export interface PincodeInfo {
    area: string;
    district: string;
    state: string;
    country: string;
}

export async function verifyPincode(pincode: string): Promise<{ success: boolean; info?: PincodeInfo; message?: string }> {
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
        return { success: false, message: 'Invalid PIN code format. Must be 6 digits.' };
    }

    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            return {
                success: true,
                info: {
                    area: postOffice.Name,
                    district: postOffice.District,
                    state: postOffice.State,
                    country: postOffice.Country,
                }
            };
        } else {
            return { success: false, message: 'PIN code not found.' };
        }
    } catch (error) {
        console.error('Pincode verification error:', error);
        return { success: false, message: 'Failed to verify PIN code. Please try again later.' };
    }
}

export async function getPincodeFromCoords(lat: number, lon: number): Promise<{ success: boolean; pincode?: string; message?: string; display_name?: string }> {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`, {
            headers: {
                'User-Agent': 'DropPurity-App'
            }
        });
        const data = await response.json();

        if (data.address && data.address.postcode) {
            // Nominatim sometimes returns "110001; 110002" or "110001-1234"
            const postcode = data.address.postcode.split(/[\s,;-]/)[0];
            if (/^\d{6}$/.test(postcode)) {
                return {
                    success: true,
                    pincode: postcode,
                    display_name: data.display_name // Return the full address
                };
            }
        }
        return { success: false, message: 'PIN code not found in address data.' };
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return { success: false, message: 'Failed to retrieve PIN code from location.' };
    }
}
