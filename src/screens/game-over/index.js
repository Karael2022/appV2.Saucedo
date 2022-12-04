import { Button, Dimensions, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Card } from "../../components";
import colors from "../../constants/colors";
import { styles } from "./styles";

const GameOver = ({rounds, selectedNumber, onRestart}) => {
    const [isPortrait, setIsPortrait] = useState(true);

    const onPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    }

    const statePortrait = () => {
        setIsPortrait(onPortrait);
    }

    useEffect(() => {
        const suscription = Dimensions.addEventListener('change', statePortrait);

        return () => {
            suscription.remove();
        }
    });

    return (
        <View style={styles.container}>
            <Card style={isPortrait ? styles.content : styles.contentLandscape}>
                <Image
                source={{ uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fportal.33bits.net%2Fgame-over%2F&psig=AOvVaw0gDUXzqUSeven7wLWhe-Zx&ust=1670239941490000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCODl84zv3_sCFQAAAAAdAAAAABAD' }} 
                style={styles.image} />
                <View style={styles.contentDetails}>
                    <Text style={styles.textContent}>Rounds: {rounds}</Text>
                    <Text style={styles.textContent}>Selected Number: {selectedNumber}</Text>
                    <Button
                        title="Restart"
                        onPress={onRestart}
                        color={colors.primary}
                    />
                </View>
            </Card>
        </View>
    )
}

export default GameOver;