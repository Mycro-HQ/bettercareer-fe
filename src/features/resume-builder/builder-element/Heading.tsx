import { Flex , Input} from '@labs/components';
import React from 'react';

const Heading = () => {
    return (
        <Flex.Column>
            
            <Input 
                label={{
                    text: "Name", 
                    align:"top"
                }}
            />
              <Input 
                label={{
                    text: "Name", 
                    align:"top"
                }}
            />
        </Flex.Column>
    );
};

export default Heading;