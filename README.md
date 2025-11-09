# YouTube Firebase App (Simplified Local Version)

?ng d?ng web demo upload và qu?n lý hình ?nh. Phiên b?n trong workspace này dùng localStorage ?? l?u ?nh (base64) thay vì k?t n?i Firebase ?? d? ch?y ngay l?p t?c.

## Tính n?ng
- Upload hình ?nh (ch?n file, nh?p tên)
- M?c ??nh l?y ngày/tháng/n?m theo múi gi? GMT+4 t? API `worldtimeapi.org` (n?u API l?i s? dùng gi? máy có +4h)
- L?c ?nh theo tên (không phân bi?t hoa th??ng)
- L?c theo ngày, tháng, n?m

## C?u trúc chính (m?i file có ph?n mô t?):

- `src/App.tsx`
 - Component g?c: qu?n lý state `images`, `filteredImages`, `nameFilter`, `dateFilter`.
 - Ch?a logic filter và g?i `getImages`/`uploadImage` t? `src/lib/storage.ts`.

- `src/components/UploadForm.tsx`
 - Form upload: l?y th?i gian GMT+4 t? API, cho phép ch?n file và nh?p tên.
 - Khi submit s? ??c file thành base64 và g?i `onUpload`.

- `src/components/ImageGallery.tsx`
 - Hi?n th? l??i các ?nh; m?i ?nh show tên và ngày tháng.

- `src/lib/storage.ts`
 - L?u/truy xu?t d? li?u ?nh vào `localStorage` v?i key `image_app_data_v1`.
 - Hàm: `getImages()`, `uploadImage(data)`.

- `src/types/index.ts`
 - ??nh ngh?a type `ImageData`.

## Cài ??t & ch?y

1. Cài dependencies

```
npm install
```

2. Start dev server

```
npm start
```

## Ghi chú
- ?ây là phiên b?n local ?? d? ch?y. N?u b?n mu?n s? d?ng Firebase th?c s?, hãy ch?nh `src/lib/firebase.ts` và `src/lib/firebaseConfig.ts` v?i c?u hình phù h?p và thay `import { getImages, uploadImage } from './lib/storage'` b?ng `./lib/firebase`.
- ?? gi?m kích th??c localStorage b?n có th? chuy?n l?u ?nh sang server ho?c Firebase Storage.

N?u c?n, tôi s? h? tr? chuy?n l?i sang Firebase và h??ng d?n cách c?u hình bi?n môi tr??ng.
