import React from 'react';
import { Card } from 'antd';


export default function Post() {
    return (
        <Card title="Card title" bordered={false} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    );
}
