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
                source={{ uri: 'https://www.kibrispdr.org/data/750/logo-game-over-8.jpg' }} 
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