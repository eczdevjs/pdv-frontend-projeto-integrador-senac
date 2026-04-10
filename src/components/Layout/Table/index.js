import React from "react";

export const Table = ({ columns, data }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}> {col.header} </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, rowIndex) => (
                        <tr key={item.id || rowIndex} >
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}> {item[col.key]}</td>
                            ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}