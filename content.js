const express = require('express');
const router = express.Router();

// Updated content routes with search and pagination
let contentData = [
    { page: 'O-Level Mathematics', content: 'Mathematics curriculum for O-Level students.' },
    { page: 'A-Level Physics', content: 'Physics curriculum for A-Level students.' },
    { page: 'O-Level English', content: 'English curriculum for O-Level students.' },
    { page: 'A-Level Chemistry', content: 'Chemistry curriculum for A-Level students.' },
    { page: 'O-Level Biology', content: 'Biology curriculum for O-Level students.' },
    { page: 'A-Level Economics', content: 'Economics curriculum for A-Level students.' },
    { page: 'O-Level History', content: 'History curriculum for O-Level students.' },
    { page: 'A-Level Literature', content: 'Literature curriculum for A-Level students.' },
    { page: 'O-Level Geography', content: 'Geography curriculum for O-Level students.' },
    { page: 'A-Level Geography', content: 'Advanced Geography curriculum for A-Level students.' },
    { page: 'O-Level Computer Science', content: 'Introduction to Computer Science for O-Level students.' },
    { page: 'A-Level Computer Science', content: 'Advanced Computer Science curriculum for A-Level students.' },
    { page: 'O-Level Physical Education', content: 'Physical Education curriculum for O-Level students.' },
    { page: 'A-Level Physical Education', content: 'Advanced Physical Education curriculum for A-Level students.' },
    { page: 'O-Level Religious Studies', content: 'Religious Studies curriculum for O-Level students.' },
    { page: 'A-Level Religious Studies', content: 'Advanced Religious Studies curriculum for A-Level students.' },
    { page: 'O-Level Art and Design', content: 'Art and Design curriculum for O-Level students.' },
    { page: 'A-Level Art and Design', content: 'Advanced Art and Design curriculum for A-Level students.' }
];

// Get all content with search and pagination
router.get('/', (req, res) => {
    const { query, page = 1, limit = 5 } = req.query;
    const filteredContent = query
        ? contentData.filter(c => c.page.toLowerCase().includes(query.toLowerCase()))
        : contentData;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedContent = filteredContent.slice(startIndex, endIndex);

    res.json({
        programs: paginatedContent,
        totalPages: Math.ceil(filteredContent.length / limit)
    });
});

// Add new content
router.post('/', (req, res) => {
    const { page, content } = req.body;
    if (!page || !content) {
        return res.status(400).json({ message: 'Page and content are required' });
    }
    contentData.push({ page, content });
    res.status(201).json({ message: 'Content added successfully' });
});

// Edit content
router.put('/:page', (req, res) => {
    const { page } = req.params;
    const { content } = req.body;
    const contentIndex = contentData.findIndex(c => c.page === page);
    if (contentIndex === -1) {
        return res.status(404).json({ message: 'Content not found' });
    }
    contentData[contentIndex].content = content;
    res.json({ message: 'Content updated successfully' });
});

// Delete content
router.delete('/:page', (req, res) => {
    const { page } = req.params;
    contentData = contentData.filter(c => c.page !== page);
    res.json({ message: 'Content deleted successfully' });
});

module.exports = router;