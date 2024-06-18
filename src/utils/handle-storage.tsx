export function SetLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function GetLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export function RemoveLocalStorage(key: string) {
    localStorage.removeItem(key);
}
