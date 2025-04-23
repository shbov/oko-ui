import { DiffComponent } from './DiffComponent';

import type { Meta, StoryObj } from '@storybook/react';

// Примеры контента для демонстрации различий
const sampleText = `Это пример текста, который демонстрирует работу компонента DiffComponent.
Он показывает различия между старой и новой версией контента.`;

const sampleOldText = `Это пример текста, который демонстрирует работу компонента DiffComponent.
Он показывает различия между старой и новой версией контента, но с некоторыми изменениями.`;

const sampleHtml = `<div class="container">
    <h1>Заголовок</h1>
    <p>Это пример HTML контента</p>
</div>`;

const sampleOldHtml = `<div class="container">
    <h1>Измененный заголовок</h1>
    <p>Это пример HTML контента с изменениями</p>
</div>`;

const meta: Meta<typeof DiffComponent> = {
    title: 'Components/DiffComponent',
    component: DiffComponent,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DiffComponent>;

// История для первого снимка (без сравнения)
export const FirstSnapshot: Story = {
    args: {
        html: sampleHtml,
        oldHtml: sampleHtml,
        text: sampleText,
        oldText: sampleText,
        screenshot: '/after.png',
        oldScreenshot: '/before.png',
        isFirst: true,
    },
};

// История для сравнения изменений
export const WithChanges: Story = {
    args: {
        html: sampleHtml,
        oldHtml: sampleOldHtml,
        text: sampleText,
        oldText: sampleOldText,
        screenshot: '/after.png',
        oldScreenshot: '/before.png',
        isFirst: false,
    },
};

// История с минимальными изменениями
export const MinimalChanges: Story = {
    args: {
        html: sampleHtml,
        oldHtml: sampleHtml.replace('Заголовок', 'Новый заголовок'),
        text: sampleText,
        oldText: sampleText.replace('демонстрирует', 'показывает'),
        screenshot: '/after.png',
        oldScreenshot: '/before.png',
        isFirst: false,
    },
};

// История с большими изменениями
export const MajorChanges: Story = {
    args: {
        html: `<div class="container">
            <h1>Полностью новый контент</h1>
            <p>С совершенно другим содержимым</p>
            <ul>
                <li>Пункт 1</li>
                <li>Пункт 2</li>
            </ul>
        </div>`,
        oldHtml: sampleHtml,
        text: `Это совершенно новый текст,
который сильно отличается от предыдущего.
Он содержит больше строк и другую структуру.`,
        oldText: sampleText,
        screenshot: '/after.png',
        oldScreenshot: '/before.png',
        isFirst: false,
    },
};
