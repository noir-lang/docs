import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highlight, { defaultProps } from "prism-react-renderer";
import github from 'prism-react-renderer/themes/github';
//import vsDark from 'prism-react-renderer/themes/vsDark';

const GitHubCode = ({ owner, repo, branch = 'master', filePath, language, startLine = 1, endLine = Infinity }) => {
    const [code, setCode] = useState('');

    useEffect(() => {
        const fetchCode = async () => {
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`
            try {
                const response = await axios.get(url);
                const content = response.data.content;
                const decodedContent = atob(content); // Decode Base64 content

                const lines = decodedContent.split('\n');
                const desiredLines = lines.slice(startLine - 1, endLine).join('\n');

                setCode(desiredLines);
            } catch (error) {
                console.error('Failed to fetch GitHub code:', error, url);
            }
        };

        fetchCode();
    }, [owner, repo, branch, filePath, startLine, endLine]);

    const highlighted = (
        <Highlight
            {...defaultProps}
            code={code}
            theme={github}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre style={style}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            {/* uncomment for line numbers */}
                            {/* <span>{i + 1}</span> */}
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )

    return highlighted;
};

export default GitHubCode;