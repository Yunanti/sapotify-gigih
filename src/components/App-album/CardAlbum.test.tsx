import { render } from "@testing-library/react";
import React from "react";
import CardAlbum from "./CardAlbum";

test('should render search pages', () => {
    render(
    <CardAlbum 
        image="https://i.scdn.co/image/ab67616d0000b273d8f1c9e9b9d9e8d8e7e8f6b2"
        title="Title"
        artist="Artist"
        onClick={() => {}}
        nama="Nama"
    >
        Test
    </CardAlbum>);
});