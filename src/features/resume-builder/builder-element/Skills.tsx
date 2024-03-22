import { Flex } from '@labs/components';
import { Select } from '@labs/components/input/select';
import React from 'react';

const Skills = () => {
    return (
        <Flex.Column>
            
            <Select  data={[{
                key: "1", 
                value: "HEllo "
            },
            {
                key: "3", 
                value: "HEl22lo "
            },
            {
                key: "3", 
                value: "HE222llo "
            }]} />
        </Flex.Column>
    );
};

export default Skills;